package com.projects.dscatalog.services;

import com.projects.dscatalog.dto.requests.CategoryDTO;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.exceptions.CatalogNotFoundException;
import com.projects.dscatalog.exceptions.CatalogStandardException;
import com.projects.dscatalog.repositories.CategoryRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    //Find all categories
    @Transactional(readOnly = true)
    public ResponseEntity<Page<CategoryDTO>> findAllCategory(String name, PageRequest pageRequest){
        Page<Category> categories = categoryRepository.findCategories(name, pageRequest);
        return ResponseEntity.ok(categories.map(CategoryDTO::new));
    }

    //Find one Category
    @Transactional(readOnly = true)
    public ResponseEntity<CategoryDTO> findById(Long id){
      CategoryDTO categoryDTO = new CategoryDTO(verifyIfExistCategoryById(id));
      return ResponseEntity.ok(categoryDTO);
    }

    //Save new category
    public ResponseEntity<ResponseMessage> saveNewCategory(CategoryDTO categoryDTO){
       if(categoryRepository.findByName(categoryDTO.getName()) != null){
           throw new CatalogStandardException("Category already registered");
       }
       Category category = categoryRepository.save(new Category(categoryDTO));
       URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
               .buildAndExpand(category.getId()).toUri();
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
        Category categoryDatabase = verifyIfExistCategoryById(id);
        categoryDatabase.setName(categoryDTO.getName());
        categoryRepository.save(categoryDatabase);
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
