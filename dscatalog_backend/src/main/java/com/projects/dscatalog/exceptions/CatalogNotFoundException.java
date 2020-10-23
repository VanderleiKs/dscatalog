package com.projects.dscatalog.exceptions;

public class CatalogNotFoundException extends RuntimeException {

    public CatalogNotFoundException(String msg){
        super(msg);
    }
}
