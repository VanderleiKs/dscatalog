package com.projects.dscatalog.services;

import com.projects.dscatalog.exceptions.CatalogException;
import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryService {

    CategoryRepository categoryRepository;

    //Find all categories
    public ResponseEntity<List<Category>> findAllCategory(){
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    //Find one Category
    public ResponseEntity<Category> findById(Long id){
      Category category = verifyIfExistCategoryById(id);
      return ResponseEntity.ok(category);
    }

    //Save new category
    public ResponseEntity<ResponseMessage> saveNewCategory(Category category){
       if(categoryRepository.findByName(category.getName()) != null){
           throw new CatalogException("Category already registered");
       }
       categoryRepository.save(category);
       ResponseMessage response = responseMessage("Category save with success!");
       return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //Delete Category
    public ResponseEntity<ResponseMessage> deleteById(Long id){
        verifyIfExistCategoryById(id);
        categoryRepository.deleteById(id);
        return ResponseEntity.ok(responseMessage("Category excluded with success!"));
    }

    //Update Category
    public ResponseEntity<ResponseMessage> updateCategory(Long id, Category category){
        verifyIfExistCategoryById(id);
        categoryRepository.save(category);
        return ResponseEntity.ok(responseMessage("Update with success!"));
    }

    //Verify if exist Category in database
    private Category verifyIfExistCategoryById(Long id) {
       return categoryRepository.findById(id)
               .orElseThrow(() -> new CatalogException("Category not found"));
    }

    //Create one message to response
    private ResponseMessage responseMessage(String message) {
        return ResponseMessage.builder().message(message).build();
    }
}
