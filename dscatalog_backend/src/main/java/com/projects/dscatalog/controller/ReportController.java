package com.projects.dscatalog.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import javax.servlet.http.HttpServletResponse;

import com.projects.dscatalog.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ProductService productService;
 
    @GetMapping
    public void report(HttpServletResponse response) throws JRException, IOException{

        Path path = productService.report(response).toPath();

        response.setHeader("Content-Disposition", "inline");
        response.addHeader("target", "_blank");
        response.setContentType("application/pdf");

        Files.copy(path, response.getOutputStream());
        response.getOutputStream().flush();
    } 
    
}
