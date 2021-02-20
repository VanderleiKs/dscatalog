package com.projects.dscatalog.controller;

import com.projects.dscatalog.dto.requests.CategoryDTO;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.services.CategoryService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<Page<CategoryDTO>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page, //Pag
            @RequestParam(value = "sizePerPage", defaultValue = "5") Integer sizePerPage, //item per pag
            @RequestParam(value = "sort", defaultValue = "ASC") String sort, //Form in ordem
            @RequestParam(value = "orderBy", defaultValue = "name") String orderBy //Per what column ordem
    ){
        PageRequest pageRequest = PageRequest.of(page, sizePerPage, Sort.Direction.valueOf(sort), orderBy);
        return categoryService.findAllCategory(pageRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable Long id){
        return categoryService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> saveNewCategory(@RequestBody CategoryDTO categoryDTO){
        return categoryService.saveNewCategory(categoryDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable Long id){
        return categoryService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO){
        return categoryService.updateCategory(id, categoryDTO);
    }
}
