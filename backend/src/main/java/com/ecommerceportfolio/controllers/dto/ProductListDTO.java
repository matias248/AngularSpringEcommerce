package com.ecommerceportfolio.controllers.dto;

import java.util.List;
import java.util.stream.Collectors;
import com.ecommerceportfolio.entities.Product;

public class ProductListDTO {

    private List<ProductDTO> products;

    private Number totalPages;

    public ProductListDTO() {
    }

    public ProductListDTO(List<Product> products, Number totalPages) {
        this.products = products.stream().map(product -> new ProductDTO(product)).collect(Collectors.toList());;
        this.totalPages = totalPages;
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

    public Number getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Number totalPages) {
        this.totalPages = totalPages;
    }

}
