package com.projects.dscatalog.services;

import java.net.URI;
import java.time.Instant;

import com.projects.dscatalog.dto.requests.ProductDTO;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.entities.Product;
import com.projects.dscatalog.exceptions.CatalogNotFoundException;
import com.projects.dscatalog.exceptions.CatalogStandardException;
import com.projects.dscatalog.repositories.CategoryRepository;
import com.projects.dscatalog.repositories.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<Page<ProductDTO>> findAll(PageRequest pageRequest) {
       Page<Product> products =  productRepository.findAll(pageRequest);
        return ResponseEntity.ok(products.map(ProductDTO::new));
    }

    //Save new Product
    public ResponseEntity<ProductDTO> saveProduct(ProductDTO productDTO){
        if(productRepository.findByName(productDTO.getName()) != null){
            throw new CatalogStandardException("Product already registered");
        }
        Product product = productRepository.save(dtoToProduct(productDTO, new Product()));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(product.getId()).toUri();
        return ResponseEntity.created(uri).body(new ProductDTO(product));
    }

    public ProductDTO findById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new CatalogNotFoundException("Not found"));
        return new ProductDTO(product, product.getCategories());
    }

    //Update product
    public ResponseEntity<ResponseMessage> updateProduct(Long id, ProductDTO productDTO){
        Product product = verifyIfExistCategoryById(id);
        productRepository.save(dtoToProduct(productDTO, product));
        return ResponseEntity.ok(responseMessage("Update with success!"));
    }

    public ResponseEntity<ResponseMessage> deleteProduct(long id){
        productRepository.deleteById(id);
        return ResponseEntity.ok().body(responseMessage("Deleted with Success!"));
    }

    //Converte for product
    private Product dtoToProduct(ProductDTO productDTO, Product product) {
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImgUrl(productDTO.getImgUrl());
        product.setDate(Instant.now());
        product.getCategories().clear();
        productDTO.getCategories().forEach(
                categoryDTO ->
                    product.getCategories().add(categoryRepository.getOne(categoryDTO.getId()))
        );
        return product;
    }

    //Verify if exist product in database
    private Product verifyIfExistCategoryById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new CatalogNotFoundException("Product not found"));
    }

    //Response Message
    private ResponseMessage responseMessage(String message){
        return ResponseMessage.builder().message(message).build();
    }
}
