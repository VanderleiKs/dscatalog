package com.projects.dscatalog.controller;

import com.projects.dscatalog.models.Category;
import com.projects.dscatalog.models.messages.ResponseMessage;
import com.projects.dscatalog.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryController {

    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> findAll(){
        return categoryService.findAllCategory();
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> saveNewCategory(@RequestBody Category category){
        return categoryService.saveNewCategory(category);
    }
}
