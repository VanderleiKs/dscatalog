package com.projects.dscatalog.exceptions;

import org.springframework.http.HttpStatus;

public class CatalogStandardException extends RuntimeException{

    public CatalogStandardException(String msg){
        super(msg);
    }
}
