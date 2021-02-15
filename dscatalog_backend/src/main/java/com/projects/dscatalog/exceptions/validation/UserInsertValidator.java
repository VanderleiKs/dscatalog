package com.projects.dscatalog.exceptions.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import com.projects.dscatalog.dto.requests.UserInsertDTO;
import com.projects.dscatalog.entities.User;
import com.projects.dscatalog.exceptions.FieldError;
import com.projects.dscatalog.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDTO> {
	
    @Autowired
    private UserRepository userRepository;

	@Override
	public void initialize(UserInsertValid ann) {
	}

	@Override
	public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {
		
		List<FieldError> list = new ArrayList<>();
		
        User user = userRepository.findByEmail(dto.getEmail());

		if(user != null) {
            list.add(new FieldError("email", "Email já cadastrado!"));
        }
		
		for (FieldError e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
