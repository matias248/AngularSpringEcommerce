package com.ecommerceportfolio.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.repositories.ProductRepository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public Product saveProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Product must not be null");
        }
        return productRepository.save(product);
    }

    public ArrayList<Product> findAllProducts() {
        Iterable<Product> products = productRepository.findAll();
        ArrayList<Product> productsList = new ArrayList<>();
        products.forEach(productsList::add);
        return productsList;
    }

    public ArrayList<Product> findAllProductsByStore(Long storeId) {
        Iterable<Product> products = productRepository.findByStoreId(storeId);
        ArrayList<Product> productsList = new ArrayList<>();
        products.forEach(productsList::add);
        return productsList;
    }

    public long countProducts() {
        return productRepository.count();
    }

    public Product findProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product updateProduct(Product product, Long id) {
        Product currentProduct = productRepository.findById(id).orElse(null);
        if (product == null || currentProduct == null) {
            return null;
        }
        Field[] fields = product.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                if ("id".equals(field.getName()) || "store".equals(field.getName())) {
                    continue;
                }
                Object newValue = field.get(product);

                if (newValue != null) {
                    field.set(currentProduct, newValue);
                }

            } catch (IllegalAccessException e) {
                throw new RuntimeException("Error when access to the fields", e);
            }
        }

        return productRepository.save(currentProduct);
    }

    public Product deleteProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return null;
        }
        productRepository.delete(product);
        return product;
    }

    public Page<Product> findByTextFilterAndCategories(String categories, String textfilter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<String> categoriesString = (categories != null) ? Arrays.asList(categories.split(",")) : null;
        Page<Product> products = productRepository.findByTextFilterAndCategories(textfilter,categoriesString,
                pageable);

        return products;

    }

}
