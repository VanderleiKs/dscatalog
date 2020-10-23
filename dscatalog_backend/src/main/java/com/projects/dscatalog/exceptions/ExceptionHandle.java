package com.projects.dscatalog.exceptions;

import com.projects.dscatalog.dto.responses.MessageException;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestControllerAdvice
@ControllerAdvice
public class ExceptionHandle extends ResponseEntityExceptionHandler {

    @ExceptionHandler({CatalogStandardException.class, CatalogNotFoundException.class})
    public ResponseEntity<Object> exceptionHandle(Exception ex){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        LocalDateTime time = LocalDateTime.now();
        time.format(DateTimeFormatter.BASIC_ISO_DATE);
        if(ex instanceof CatalogNotFoundException) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<Object>(MessageException
                    .builder()
                    .instant(LocalDateTime.now())
                    .message(ex.getMessage())
                    .build(), status);

    }
}
