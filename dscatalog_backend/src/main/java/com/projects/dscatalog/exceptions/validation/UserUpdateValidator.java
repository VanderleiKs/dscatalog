package com.projects.dscatalog.exceptions.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.projects.dscatalog.dto.requests.UserUpdateDTO;
import com.projects.dscatalog.entities.User;
import com.projects.dscatalog.exceptions.FieldError;
import com.projects.dscatalog.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {
	
	@Autowired
	private HttpServletRequest request;

    @Autowired
    private UserRepository userRepository;

	@Override
	public void initialize(UserUpdateValid ann) {
	}

	@Override
	public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
		
		List<FieldError> list = new ArrayList<>();

		@SuppressWarnings("unchecked")
		var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long idTest = Long.parseLong(uriVars.get("id"));

        User user = userRepository.findByEmail(dto.getEmail());

		if(user != null && idTest != user.getId()) {
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
