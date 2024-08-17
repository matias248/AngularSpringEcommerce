package com.ecommerceportfolio.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerceportfolio.controllers.dto.ProductDTO;
import com.ecommerceportfolio.controllers.dto.ProductListDTOwithStoreDTO;
import com.ecommerceportfolio.controllers.dto.StoreDTO;
import com.ecommerceportfolio.controllers.dto.ProductDTOwithStoreDTO;
import com.ecommerceportfolio.controllers.dto.ProductListDTO;
import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.services.ProductService;
import com.ecommerceportfolio.services.StoreService;

import java.util.List;

@RestController
@RequestMapping("/stores/{idStore}/products")
@CrossOrigin(origins = "*")
public class ProductFilterByStoreController {

    @Autowired
    private ProductService productService;

    @Autowired
    private StoreService storeService;

    @GetMapping
    public ResponseEntity<ProductListDTOwithStoreDTO> getProductsByStoreId(@PathVariable Long idStore) {
        List<Product> products = productService.findAllProductsByStore(idStore);
        Store store = storeService.findStoreById(idStore);
        if (store == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ProductListDTO productListDTO = new ProductListDTO(products, 1);
        ProductListDTOwithStoreDTO response = new ProductListDTOwithStoreDTO(productListDTO, new StoreDTO(store));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTOwithStoreDTO> getProductAndStoreById(@PathVariable Long id,
            @PathVariable Long idStore) {

        Product product = productService.findProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Store store = storeService.findStoreById(idStore);
        if (store == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ProductDTO productDTO = new ProductDTO(product);

        ProductDTOwithStoreDTO response = new ProductDTOwithStoreDTO(productDTO, new StoreDTO(store));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
