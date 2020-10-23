package com.projects.dscatalog.exceptions;

import com.projects.dscatalog.dto.responses.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@ControllerAdvice
public class ExceptionHandle extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CatalogException.class)
    public ResponseEntity<Object> exceptionHandle(RuntimeException ex){
        return new ResponseEntity<>(ResponseMessage.builder().message(ex.getMessage()).build(), HttpStatus.BAD_REQUEST);
    }
}
