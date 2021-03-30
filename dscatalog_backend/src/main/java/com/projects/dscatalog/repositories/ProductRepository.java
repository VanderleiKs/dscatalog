package com.projects.dscatalog.repositories;

import java.util.List;

import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.entities.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Find by name product
    @Query("select p from Product p where p.name = :name")
    Product findByName(String name);

    @Query("SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE "
            + "(COALESCE(:categories) IS NULL OR cats IN :categories ) AND "
            + "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
    Page<Product> findProducts(List<Category> categories, String name, Pageable pageable);

    @Query("SELECT obj FROM Product obj JOIN FETCH obj.categories WHERE obj IN :products")
    List<Product> find(List<Product> products);

}
