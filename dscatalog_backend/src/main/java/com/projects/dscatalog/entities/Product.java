package com.projects.dscatalog.entities;

import com.projects.dscatalog.dto.requests.CategoryDTO;
import com.projects.dscatalog.dto.requests.ProductDTO;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Double price;
    private String imgUrl;
    private Instant date;

    @ManyToMany
    @JoinTable(name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private final Set<Category> categories = new HashSet<>();

    public Product(){}

    public Product(ProductDTO productDTO) {
        this.setName(productDTO.getName());
        this.setDescription(productDTO.getDescription());
        this.setPrice(productDTO.getPrice());
        this.setImgUrl(productDTO.getImgUrl());
        this.setDate(Instant.now());
    }

    public Product(ProductDTO productDTO, Set<CategoryDTO> categories){
        this(productDTO);
        categories.forEach(cat -> this.categories.add(new Category(cat)));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Instant getDate(){
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<Category> getCategories() {
        return categories;
    }
}
