package com.projects.dscatalog.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projects.dscatalog.dto.requests.CategoryDTO;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "categories")
    private final List<Product> products = new ArrayList<>();

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant updateAt;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createAt;

    public Category(){}

    public Category(CategoryDTO categoryDTO){
        this.setName(categoryDTO.getName());
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

    public Instant getUpdateAt() {
        return updateAt;
    }

    public Instant getCreateAt() {
        return createAt;
    }

    @JsonIgnore
    public List<Product> getProducts() {
        return products;
    }

    @PrePersist
    public void preCreate(){
        createAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate(){
        updateAt = Instant.now();
    }


}
