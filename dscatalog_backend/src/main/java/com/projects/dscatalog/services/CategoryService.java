package com.projects.dscatalog.services;

import com.projects.dscatalog.dto.requests.CategoryDTO;
import com.projects.dscatalog.exceptions.CatalogNotFoundException;
import com.projects.dscatalog.exceptions.CatalogStandardException;
import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.mapper.CategoryMapper;
import com.projects.dscatalog.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryService {

   private final CategoryRepository categoryRepository;
   private final CategoryMapper categoryMapper = CategoryMapper.INSTANCE;

    //Find all categories
    @Transactional(readOnly = true)
    public ResponseEntity<List<CategoryDTO>> findAllCategory(){
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories.stream()
                .map(categoryMapper::toCategoryDTO)
                .collect(Collectors.toList()));
    }

    //Find one Category
    @Transactional(readOnly = true)
    public ResponseEntity<CategoryDTO> findById(Long id){
      CategoryDTO categoryDTO = categoryMapper.toCategoryDTO(verifyIfExistCategoryById(id));
      return ResponseEntity.ok(categoryDTO);
    }

    //Save new category
    public ResponseEntity<ResponseMessage> saveNewCategory(Category category){
       if(categoryRepository.findByName(category.getName()) != null){
           throw new CatalogStandardException("Category already registered");
       }
       CategoryDTO categoryDTO = categoryMapper.toCategoryDTO(categoryRepository.save(category));
       URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
               .buildAndExpand(categoryDTO.getId()).toUri();
       return ResponseEntity.created(uri).body(responseMessage("Category save with success!"));
    }

    //Delete Category
    public ResponseEntity<ResponseMessage> deleteById(Long id) {
        try {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok(responseMessage("Category excluded with success!"));
        }
        catch (EmptyResultDataAccessException ex){
            throw new CatalogNotFoundException("Category not found");
        }
        catch (DataIntegrityViolationException ex){
            throw new CatalogStandardException("Database Violation");
        }

    }

    //Update Category
    public ResponseEntity<ResponseMessage> updateCategory(Long id, CategoryDTO categoryDTO){
        verifyIfExistCategoryById(id);
        Category categoryToSave = categoryMapper.toCategory(categoryDTO);
        categoryToSave.setID(id);
        categoryRepository.save(categoryToSave);
        return ResponseEntity.ok(responseMessage("Update with success!"));
    }

    //Verify if exist Category in database
    private Category verifyIfExistCategoryById(Long id) {
       return categoryRepository.findById(id)
               .orElseThrow(() -> new CatalogNotFoundException("Category not found"));
    }

    //Create one message to response
    private ResponseMessage responseMessage(String message) {
        return ResponseMessage.builder().message(message).build();
    }
}
