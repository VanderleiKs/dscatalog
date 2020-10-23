package com.projects.dscatalog.controller;

import com.projects.dscatalog.dto.requests.CategoryDTO;
import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryController {

    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAll(){
        return categoryService.findAllCategory();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id){
        return categoryService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> saveNewCategory(@RequestBody Category category){
        return categoryService.saveNewCategory(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable Long id){
        return categoryService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateCategory(@PathVariable Long id, @RequestBody Category category){
        return categoryService.updateCategory(id, category);
    }
}
