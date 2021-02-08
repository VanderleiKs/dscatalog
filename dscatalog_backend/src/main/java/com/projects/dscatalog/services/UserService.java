package com.projects.dscatalog.services;

import javax.xml.catalog.CatalogException;

import com.projects.dscatalog.dto.requests.UserDTO;
import com.projects.dscatalog.dto.requests.UserInsertDTO;
import com.projects.dscatalog.entities.User;
import com.projects.dscatalog.exceptions.CatalogNotFoundException;
import com.projects.dscatalog.repositories.RoleRepository;
import com.projects.dscatalog.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Page<UserDTO> findAllUsers(PageRequest pageRequest) {
        Page<User> users = userRepository.findAll(pageRequest);
        return users.map(UserDTO::new);
    }

    public UserDTO findById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new CatalogException("User not found"));
        return new UserDTO(user);
    }

    public UserDTO saveNewUser(UserInsertDTO userDTO){
        if(userRepository.findByEmail(userDTO.getEmail()) != null){
            throw new CatalogNotFoundException("Email already registered!");
        }
        User user = new User();
        userDtoToUser(userDTO, user);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        UserDTO newUserDTO = new UserDTO(userRepository.save(user));
       
        return newUserDTO;
    }

    public String updateUser(UserDTO userDTO, Long id){
        User user = new User();
        user = userRepository.getOne(id);
        userDtoToUser(userDTO, user);
        userRepository.save(user);
        return userDTO.getFirstName() + " Update with success!";
    }

    public String deleteUser(Long id){
        userRepository.findById(id).orElseThrow(() -> new CatalogNotFoundException("Id not found!"));
        userRepository.deleteById(id);
        return id + " excluded with success!";
    }

    private User userDtoToUser(UserDTO userDTO, User user) {
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.getRoles().clear();
        userDTO.getRoles().forEach(role -> user.getRoles().add(roleRepository.getOne(role.getId())));
        return user;
    }
}
