package com.projects.dscatalog.dto.requests;

import com.projects.dscatalog.entities.Category;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class CategoryDTO {

    private Long id;
    @NotEmpty
    @Size(min = 2, max = 50)
    private String name;


    public CategoryDTO(){}

    public CategoryDTO(Category cat) {
        this.id = cat.getId();
        this.setName(cat.getName());
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
}
