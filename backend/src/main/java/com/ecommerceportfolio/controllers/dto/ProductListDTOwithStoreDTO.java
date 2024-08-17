package com.ecommerceportfolio.controllers.dto;

public class ProductListDTOwithStoreDTO {
    
    private ProductListDTO productListDTO;
    
    private StoreDTO store;
    
    public ProductListDTOwithStoreDTO(ProductListDTO productListDTO, StoreDTO storeDTO) {
        this.productListDTO = productListDTO;
        this.store = storeDTO;
    }
    
    public StoreDTO getStore() {
        return store;
    }
    public void setStore(StoreDTO store) {
        this.store = store;
    }
    public ProductListDTO getProductListDTO() {
        return productListDTO;
    }
    public void setProductListDTO(ProductListDTO products) {
        this.productListDTO = products;
    }
}
