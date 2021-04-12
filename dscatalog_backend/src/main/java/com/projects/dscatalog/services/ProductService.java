package com.projects.dscatalog.services;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.net.URI;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.projects.dscatalog.dto.requests.ProductDTO;
import com.projects.dscatalog.dto.responses.ResponseMessage;
import com.projects.dscatalog.entities.Category;
import com.projects.dscatalog.entities.Product;
import com.projects.dscatalog.exceptions.CatalogNotFoundException;
import com.projects.dscatalog.exceptions.CatalogStandardException;
import com.projects.dscatalog.repositories.CategoryRepository;
import com.projects.dscatalog.repositories.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ProductService implements Serializable{
    private static final long serialVersionUID = 1L;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public void report(HttpServletResponse response) throws JRException, IOException{
        List<Product> products = productRepository.findAll();
        File file = ResourceUtils.getFile("Report.jrxml");
        JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(products);
        Map<String, Object> map = new HashMap<>();
        map.put("bala", "Ana Paula");
        response.setHeader("Content-Disposition", "inline; filename=relatorio.pdf");
        response.setContentType("application/pdf");
        JasperPrint jasperPrint = JasperFillManager.fillReport(report, map, dataSource);
        final OutputStream outStream = response.getOutputStream();
        //JasperExportManager.exportReportToPdfFile(jasperPrint, "c:\\relatorios\\relat.pdf");
        JasperExportManager.exportReportToPdfStream(jasperPrint, outStream);
    }


    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<Page<ProductDTO>> findAll(Long categoryId, String name, PageRequest pageRequest) {
        List<Category> categories = (categoryId == 0) ? null : Arrays.asList(categoryRepository.getOne(categoryId));
        Page<Product> products = productRepository.findProducts(categories, name, pageRequest);
        productRepository.find(products.toList());
        return ResponseEntity.ok(products.map(product -> new ProductDTO(product, product.getCategories())));
    }

    // Save new Product
    public ResponseEntity<ProductDTO> saveProduct(ProductDTO productDTO) {
        if (productRepository.findByName(productDTO.getName()) != null) {
            throw new CatalogStandardException("Product already registered");
        }
        Product product = productRepository.save(dtoToProduct(productDTO, new Product()));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(product.getId())
                .toUri();
        return ResponseEntity.created(uri).body(new ProductDTO(product));
    }

    public ProductDTO findById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new CatalogNotFoundException("Not found"));
        return new ProductDTO(product, product.getCategories());
    }

    // Update product
    public ResponseEntity<ResponseMessage> updateProduct(Long id, ProductDTO productDTO) {
        Product product = verifyIfExistCategoryById(id);
        productRepository.save(dtoToProduct(productDTO, product));
        return ResponseEntity.ok(responseMessage("Update with success!"));
    }

    public ResponseEntity<ResponseMessage> deleteProduct(long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok().body(responseMessage("Deleted with Success!"));
    }

    // Converte for product
    private Product dtoToProduct(ProductDTO productDTO, Product product) {
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImgUrl(productDTO.getImgUrl());
        product.setDate(Instant.now());
        product.getCategories().clear();
        productDTO.getCategories()
                .forEach(categoryDTO -> product.getCategories().add(categoryRepository.getOne(categoryDTO.getId())));
        return product;
    }

    // Verify if exist product in database
    private Product verifyIfExistCategoryById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new CatalogNotFoundException("Product not found"));
    }

    // Response Message
    private ResponseMessage responseMessage(String message) {
        return ResponseMessage.builder().message(message).build();
    }
}
