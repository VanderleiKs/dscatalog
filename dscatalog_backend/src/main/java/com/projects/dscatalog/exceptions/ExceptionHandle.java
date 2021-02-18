package com.projects.dscatalog.exceptions;

import java.time.LocalDateTime;

import com.projects.dscatalog.dto.responses.MessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ExceptionHandle {

    @ExceptionHandler({CatalogStandardException.class, CatalogNotFoundException.class})
    public ResponseEntity<Object> exceptionHandle(Exception ex){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if(ex instanceof CatalogNotFoundException) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(MessageException
                    .builder()
                    .instant(LocalDateTime.now())
                    .message(ex.getMessage())
                    .build(), status);

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationError> errorValidation(MethodArgumentNotValidException ex){
        ValidationError erro = new ValidationError();

        erro.setInstant(LocalDateTime.now());
        erro.setMessage("Error Validation Exception");
        for(FieldError f : ex.getBindingResult().getFieldErrors()){
            erro.addError(f.getField(), f.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(erro);      
    }
    
}

