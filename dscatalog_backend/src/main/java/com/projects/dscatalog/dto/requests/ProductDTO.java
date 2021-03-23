package com.projects.dscatalog.dto.requests;

import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.entities.Product;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class ProductDTO {

    private Long id;
    @NotBlank(message = "Campo obrigatório")
    private String name;
    @Positive(message = "Preço inválido")
    private Double price;
    @NotBlank(message = "Campo obrigatório")
    private String description;
    private String imgUrl;
    private final Set<CategoryDTO> categories = new HashSet<>();

    public ProductDTO(){}

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.setName(product.getName());
        this.setPrice(product.getPrice());
        this.setDescription(product.getDescription());
        this.setImgUrl(product.getImgUrl());
    }

    public ProductDTO(Product product, Set<Category> categories) {
        this(product);
        categories.forEach(cat -> this.categories.add(new CategoryDTO(cat)));
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

}
