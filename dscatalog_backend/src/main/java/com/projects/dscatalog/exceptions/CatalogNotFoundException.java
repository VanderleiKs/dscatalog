package com.projects.dscatalog.exceptions;

public class CatalogNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public CatalogNotFoundException(String msg){
        super(msg);
    }
}
