package com.projects.dscatalog.controller;

import javax.validation.Valid;

import com.projects.dscatalog.dto.requests.ProductDTO;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "sizePage", defaultValue = "3") Integer sizePage,
            @RequestParam(value = "direction", defaultValue = "Asc") String direction,
            @RequestParam(value = "orderBy", defaultValue = "name") String orderBy
    ){
        PageRequest pageRequest = PageRequest.of(page, sizePage, Direction.valueOf(direction), orderBy);
        return productService.findAll(pageRequest);
    }

    @GetMapping("/{id}")
    public ProductDTO findById(@PathVariable Long id){
        return productService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(@Valid @RequestBody ProductDTO productDTO){
        return productService.saveProduct(productDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO productDTO){
        return productService.updateProduct(id, productDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteProduct(@PathVariable Long id){
        return productService.deleteProduct(id);
    }


}
