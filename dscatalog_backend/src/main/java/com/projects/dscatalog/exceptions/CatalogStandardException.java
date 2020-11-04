package com.projects.dscatalog.exceptions;


public class CatalogStandardException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public CatalogStandardException(String msg) {
        super(msg);
    }
}
