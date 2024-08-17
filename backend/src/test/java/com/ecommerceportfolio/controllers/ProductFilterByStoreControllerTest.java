package com.ecommerceportfolio.controllers;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.ArrayList;

import org.hamcrest.CoreMatchers;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.ecommerceportfolio.EcommerceportfolioApplication;
import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.services.ProductService;
import com.ecommerceportfolio.services.StoreService;

@SpringBootTest(classes = EcommerceportfolioApplication.class)
@AutoConfigureMockMvc
public class ProductFilterByStoreControllerTest {

        @MockBean
        private ProductService productService;

        @MockBean
        private StoreService storeService;

        @Autowired
        private MockMvc mockMvc;

        Address address;
        Location location;
        Product product;
        Store store;

        @BeforeEach
        public void init() {
                address = new Address("snumber", "sname", "city", "state", "zipcode");
                location = new Location(1.1, 1.1);
                store = new Store(1L, "name", "", "", address, location);
                product = new Product("name", "description", 1.1, "", "", "", store, "");
        }

        @Test
        void testGetProductsByStoreId() throws Exception {
                ArrayList<Product> listProducts = new ArrayList<>();
                listProducts.add(product);

                Mockito.when(productService.findAllProductsByStore(1L)).thenReturn(listProducts);

                Mockito.when(storeService.findStoreById(1L)).thenReturn(store);

                ResultActions response = mockMvc.perform(get("/stores/1/products")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.totalPages",
                                                CoreMatchers.is(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products",
                                                Matchers.hasSize(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products.[0].name",
                                                CoreMatchers.is(store.getName())))

                                .andExpect(MockMvcResultMatchers.jsonPath(
                                                "$.productListDTO.products.[0].description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products.[0].imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products.[0].price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products.[0].currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath(
                                                "$.productListDTO.products.[0].inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products.[0].storeId",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.store.id",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.store.name",
                                                CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.productListDTO.products.[0].category",
                                                CoreMatchers.is(product.getCategory())));
        }

        @Test
        void testGetProductById() throws Exception {
                when(productService.findProductById(anyLong())).thenReturn(product);
                Mockito.when(storeService.findStoreById(anyLong())).thenReturn(store);

                ResultActions response = mockMvc.perform(get("/stores/1/products/1")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.name",
                                                CoreMatchers.is(product.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.storeId",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.store.id",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.store.name",
                                                CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.product.category",
                                                CoreMatchers.is(product.getCategory())));
        }
}
