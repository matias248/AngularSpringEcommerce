package com.ecommerceportfolio.controllers.dto;


public class ProductDTOwithStoreDTO {

    private ProductDTO product;

    private StoreDTO store;
    
    public ProductDTOwithStoreDTO(ProductDTO product, StoreDTO store) {
        this.product = product;
        this.store = store;
    }

    public StoreDTO getStore() {
        return store;
    }
    public void setStore(StoreDTO store) {
        this.store = store;
    }


    public ProductDTO getProduct() {
        return product;
    }


    public void setProduct(ProductDTO product) {
        this.product = product;
    }
   
    
}
