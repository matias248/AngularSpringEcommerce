package com.ecommerceportfolio.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerceportfolio.controllers.dto.ProductDTO;
import com.ecommerceportfolio.controllers.dto.ProductListDTO;
import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.services.ProductService;
import com.ecommerceportfolio.services.StoreService;


import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductGeneralController {

    @Autowired
    private ProductService productService;

    @Autowired
    private StoreService storeService;

    @PutMapping("/{idProduct}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long idProduct,
            @RequestBody ProductDTO productDTO) {

        Product product = productService.findProductById(idProduct);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Store store = storeService.findStoreById(product.getStore().getId());
        if (store == null) {
            return ResponseEntity.notFound().build();
        }

        Product productUpdate = new Product(productDTO.getName(),
                productDTO.getDescription(), productDTO.getPrice(),
                productDTO.getInventoryStatus(), productDTO.getCategory(),
                productDTO.getImageUrl(), store, productDTO.getCurrency());

        Product updatedProduct = productService.updateProduct(productUpdate, idProduct);

        if (updatedProduct == null) {
            return ResponseEntity.notFound().build();
        }
        ProductDTO response = new ProductDTO(updatedProduct);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{idProduct}")
    public ResponseEntity<ProductDTO> deleteProductBy(@PathVariable Long idProduct) {
        Product deletedProduct = productService.deleteProductById(idProduct);

        if (deletedProduct == null) {
            return ResponseEntity.notFound().build();
        }

        ProductDTO response = new ProductDTO(deletedProduct);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        if (productDTO.getStoreId() == null) {
            return ResponseEntity.badRequest().build();
        }
        Store store = storeService.findStoreById(productDTO.getStoreId());
        if (store == null) {
            return ResponseEntity.badRequest().build();
        }

        Product product = new Product(productDTO.getName(),
                productDTO.getDescription(), productDTO.getPrice(),
                productDTO.getInventoryStatus(), productDTO.getCategory(),
                productDTO.getImageUrl(), store, productDTO.getCurrency());

        Product result = productService.saveProduct(product);
        ProductDTO response = new ProductDTO(result);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.findProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ProductDTO response = new ProductDTO(product);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/public")
    public ResponseEntity<ProductListDTO> getProductsPublic(
            @RequestParam(required = false) String textfilter,
            @RequestParam(required = false) String categories,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Product> productsPage = productService.findByTextFilterAndCategories(categories, textfilter, page, size);
        ProductListDTO result = new ProductListDTO(productsPage.getContent(), productsPage.getTotalPages());

        return ResponseEntity.ok(result);
    }

    @GetMapping("")
    public ResponseEntity<ProductListDTO> getProducts() {
        List<Product> products = productService.findAllProducts();

        ProductListDTO productListDTO = new ProductListDTO(products, 1);
        return ResponseEntity.ok(productListDTO);
    }

}