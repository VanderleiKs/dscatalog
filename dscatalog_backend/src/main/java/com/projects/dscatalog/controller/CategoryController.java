package com.projects.dscatalog.controller;

import com.projects.dscatalog.dto.requests.CategoryDTO;
import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoryController {

    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<CategoryDTO>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page, //Pag
            @RequestParam(value = "sizePerPage", defaultValue = "5") Integer sizePerPage, //item per pag
            @RequestParam(value = "sort", defaultValue = "ASC") String sort, //Form ordem
            @RequestParam(value = "orderBy", defaultValue = "name") String orderBy //Per column ordem
    ){
        PageRequest pageRequest = PageRequest.of(page, sizePerPage, Sort.Direction.valueOf(sort), orderBy);
        return categoryService.findAllCategory(pageRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable Long id){
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
    public ResponseEntity<ResponseMessage> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO){
        return categoryService.updateCategory(id, categoryDTO);
    }
}
