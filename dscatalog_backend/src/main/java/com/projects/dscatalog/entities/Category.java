package com.projects.dscatalog.entities;

import javax.persistence.*;
import java.time.Instant;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant updateAt;
    private Instant createAt;

    public Category(){}

    public Long getId() {
        return id;
    }

    public void setID(Long id) {
        this.id = id;
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

    @PrePersist
    public void preCreate(){
        createAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate(){
        updateAt = Instant.now();
    }


}
