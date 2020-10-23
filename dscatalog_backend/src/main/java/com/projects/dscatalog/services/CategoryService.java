package com.projects.dscatalog.services;

import com.projects.dscatalog.exceptions.CatalogException;
import com.projects.dscatalog.models.Category;
import com.projects.dscatalog.models.messages.ResponseMessage;
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

    //Save new category
    public ResponseEntity<ResponseMessage> saveNewCategory(Category category){
       if(categoryRepository.findByName(category.getName()) != null){
           throw new CatalogException("Category already registered");
       }
       categoryRepository.save(category);
       ResponseMessage r = ResponseMessage.builder().message("Category save with success!").build();
       return new ResponseEntity<>(r, HttpStatus.CREATED);
    }
}
