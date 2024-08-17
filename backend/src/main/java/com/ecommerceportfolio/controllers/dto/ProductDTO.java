package com.ecommerceportfolio.controllers.dto;

import com.ecommerceportfolio.entities.Product;

public class ProductDTO {

    private Long id;

    private String name;

    private String description;

    private Double price;

    private String inventoryStatus;

    private String category;

    private String imageUrl;

    private Long storeId;

    private String currency;

    // Getters y Setters

    public ProductDTO(Long id, String name, String description, Double price, String inventoryStatus,
            String category, String imageUrl, Long storeId, String currency) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.inventoryStatus = inventoryStatus;
        this.category = category;
        this.imageUrl = imageUrl;
        this.storeId = storeId;
        this.currency = currency;
    }

    public ProductDTO() {
    }

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.inventoryStatus = product.getInventoryStatus();
        this.category = product.getCategory();
        this.imageUrl = product.getImageUrl();
        this.storeId = product.getStore().getId();
        this.currency = product.getCurrency();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getInventoryStatus() {
        return inventoryStatus;
    }

    public void setInventoryStatus(String inventoryStatus) {
        this.inventoryStatus = inventoryStatus;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
