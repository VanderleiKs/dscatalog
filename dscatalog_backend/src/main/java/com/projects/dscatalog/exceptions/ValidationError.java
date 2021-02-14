package com.projects.dscatalog.exceptions;

import java.util.ArrayList;
import java.util.List;

import com.projects.dscatalog.dto.responses.MessageException;

public class ValidationError extends MessageException {
    
    List<FieldError> errors = new ArrayList<>();

    public List<FieldError> getErrors() {
        return errors;
    }

   public void addError(String fieldName, String message){
       errors.add(new FieldError(fieldName, message));
   }
}
