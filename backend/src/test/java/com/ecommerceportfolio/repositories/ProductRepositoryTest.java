package com.ecommerceportfolio.repositories;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.entities.Store;
import org.assertj.core.api.Assertions;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

@DataJpaTest
public class ProductRepositoryTest {

        @Autowired
        ProductRepository productRepository;

        @Autowired
        StoreRepository storeRepository;

        Address address;
        Location location;

        Product product;
        Store store;

        @BeforeEach
        public void init() {
                address = new Address("snumber", "sname", "city", "state", "zipcode");
                location = new Location(1.1, 1.1);
                store = new Store(null, "name", "", "", address, location);
                product = new Product("name", "description", 1.1, "", "Accessories", "", store, "");
        }

        @Test
        void testIfCategoryFilterWorks() {
                Pageable pageable = PageRequest.of(0, 10);
                storeRepository.save(store);

                productRepository.save(product);
                List<Product> productResult = new ArrayList<>();
                productResult.add(product);

                Page<Product> products = productRepository.findByTextFilterAndCategories(null,
                                Arrays.asList("Accessories", "random"),
                                pageable);
                Page<Product> products2 = productRepository.findByTextFilterAndCategories(null, Arrays.asList("random"),
                                pageable);
                Assertions.assertThat(products.getContent())
                                .containsExactlyInAnyOrder(
                                                product);
                Assertions.assertThat(products2.getContent())
                                .containsExactlyInAnyOrder();
        }

        @Test
        void testIfTextFilterWorks() {
                Pageable pageable = PageRequest.of(0, 10);
                storeRepository.save(store);

                productRepository.save(product);
                List<Product> productResult = new ArrayList<>();
                productResult.add(product);
                Page<Product> products = productRepository.findByTextFilterAndCategories("name", null,
                                pageable);

                Page<Product> products2 = productRepository.findByTextFilterAndCategories("randomName", null,
                                pageable);

                Assertions.assertThat(products.getContent())
                                .containsExactlyInAnyOrder(
                                                product);
                Assertions.assertThat(products2.getContent())
                                .containsExactlyInAnyOrder();
        }

        @Test
        void testIfTextFilterWorksIfCategoryFilterWorks() {
                Pageable pageable = PageRequest.of(0, 10);
                storeRepository.save(store);

                productRepository.save(product);
                List<Product> productResult = new ArrayList<>();
                productResult.add(product);
                Page<Product> products = productRepository.findByTextFilterAndCategories("name",
                                Arrays.asList("Accessories"),
                                pageable);

                Page<Product> products2 = productRepository.findByTextFilterAndCategories("randomName",
                                Arrays.asList("random"),
                                pageable);
                Page<Product> products3 = productRepository.findByTextFilterAndCategories("name",
                                Arrays.asList("random"),
                                pageable);

                Page<Product> products4 = productRepository.findByTextFilterAndCategories("randomName",
                                Arrays.asList("Accessories"),
                                pageable);

                Assertions.assertThat(products.getContent())
                                .containsExactlyInAnyOrder(
                                                product);
                Assertions.assertThat(products2.getContent())
                                .containsExactlyInAnyOrder();

                Assertions.assertThat(products3.getContent())
                                .containsExactlyInAnyOrder();

                Assertions.assertThat(products4.getContent())
                                .containsExactlyInAnyOrder();
        }

}
