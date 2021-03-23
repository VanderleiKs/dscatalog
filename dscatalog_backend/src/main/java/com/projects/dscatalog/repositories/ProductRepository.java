package com.projects.dscatalog.repositories;

import java.util.List;

import com.projects.dscatalog.entities.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Find by name product
    @Query("select p from Product p where p.name = ?1")
    Product findByName(String name);

    @Query("SELECT obj FROM Product obj JOIN FETCH obj.categories WHERE obj IN :products")
    List<Product> find(List<Product> products);

}
