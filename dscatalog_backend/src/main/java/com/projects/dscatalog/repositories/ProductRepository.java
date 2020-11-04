package com.projects.dscatalog.repositories;

import com.projects.dscatalog.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Find by name product
    @Query("select p from Product p where p.name = ?1")
    Product findByName(String name);

}
