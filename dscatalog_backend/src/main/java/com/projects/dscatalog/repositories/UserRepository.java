package com.projects.dscatalog.repositories;

import com.projects.dscatalog.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //@Query("select u from User u where u.email = ?1")
    User findByEmail(String email);
    
}
