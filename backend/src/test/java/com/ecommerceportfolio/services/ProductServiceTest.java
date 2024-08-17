package com.ecommerceportfolio.services;

import static org.mockito.Mockito.when;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.BDDMockito.given;


import com.ecommerceportfolio.EcommerceportfolioApplication;
import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.repositories.ProductRepository;

@SpringBootTest(classes = EcommerceportfolioApplication.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    Address address;
    Location location;
    Product product;
    Store store;
    Store store2;

    @BeforeEach
    public void init() {
        address = new Address("snumber", "sname", "city", "state", "zipcode");
        location = new Location(1.1, 1.1);
        store = new Store(null, "name", "", "", address, location);
        store2 = new Store(null, "name", "", "", address, location);

        product = new Product("name", "description", 1.1, "", "", "", store, "");
        product.setId(1L);
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateProduct() {
        Product newProduct = new Product("newName", "new", 2., "new", "new", "new", store2, "$");
        Optional<Product> optionalProduct = Optional.of(product);

        when(productRepository.findById(Mockito.anyLong())).thenReturn(optionalProduct);
        given(productRepository.save(ArgumentMatchers.any()))
                .willAnswer((invocation -> invocation.getArgument(0)));
        Product productResponse = productService.updateProduct(newProduct, product.getId());

        Assertions.assertThat(productResponse.getId()).isEqualTo(1L);
        Assertions.assertThat(productResponse.getStore()).isEqualTo(store);
        Assertions.assertThat(productResponse.getPrice()).isEqualTo(2.);
        Assertions.assertThat(productResponse.getCategory()).isEqualTo("new");
        Assertions.assertThat(productResponse.getCurrency()).isEqualTo("$");
        Assertions.assertThat(productResponse.getDescription()).isEqualTo("new");
        Assertions.assertThat(productResponse.getImageUrl()).isEqualTo("new");
        Assertions.assertThat(productResponse.getName()).isEqualTo("newName");
        Assertions.assertThat(productResponse.getInventoryStatus()).isEqualTo("new");

    }
}
