package com.projects.dscatalog.exceptions;

import com.projects.dscatalog.dto.responses.MessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
@ControllerAdvice
public class ExceptionHandle extends ResponseEntityExceptionHandler {

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
}
