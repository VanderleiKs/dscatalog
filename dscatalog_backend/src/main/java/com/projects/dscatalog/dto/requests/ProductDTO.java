package com.projects.dscatalog.dto.requests;

import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.entities.Product;

import java.util.HashSet;
import java.util.Set;

public class ProductDTO {

    private Long id;
    private String name;
    private Double price;
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
        //product.getCategories().forEach(cat -> this.categories.add(new CategoryDTO(cat)));
    }

    public ProductDTO(Product product, Set<Category> categories) {
        this.id = product.getId();
        this.setName(product.getName());
        this.setPrice(product.getPrice());
        this.setDescription(product.getDescription());
        this.setImgUrl(product.getImgUrl());
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
