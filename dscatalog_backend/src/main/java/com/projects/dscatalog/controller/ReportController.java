package com.projects.dscatalog.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.projects.dscatalog.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public void report(HttpServletResponse response) throws JRException, IOException {
        // "inline"attachment; filename=MeuRelatorio.pdf"
        //response.addHeader("responseType", "blob");
        productService.report(response);
    }

}
