package com.projects.dscatalog.controller;

import java.net.URI;

import com.projects.dscatalog.dto.requests.UserDTO;
import com.projects.dscatalog.dto.requests.UserInsertDTO;
import com.projects.dscatalog.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAllUsers(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "5") int size,
        @RequestParam(value = "sort", defaultValue = "ASC") String sort,
        @RequestParam(value = "orderby", defaultValue = "firstName") String orderby
    ) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.valueOf(sort), orderby);
        return ResponseEntity.ok().body(userService.findAllUsers(pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok().body(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserDTO> saveNewUser(@RequestBody UserInsertDTO userDTO){
        UserDTO newUserDTO = userService.saveNewUser(userDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(newUserDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(newUserDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        return ResponseEntity.ok().body(userService.updateUser(userDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
       return ResponseEntity.ok().body(userService.deleteUser(id));
    }
}
