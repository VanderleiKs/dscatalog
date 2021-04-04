package com.projects.dscatalog.repositories;

import com.projects.dscatalog.entities.Category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    //Find by name category
    @Query("select u from Category u where u.name = ?1")
    Category findByName(String name);

    @Query("SELECT DISTINCT cat FROM Category cat WHERE (LOWER(cat.name) LIKE LOWER(CONCAT('%',:name,'%')))")
    Page<Category> findCategories(String name, Pageable pageable);
}
