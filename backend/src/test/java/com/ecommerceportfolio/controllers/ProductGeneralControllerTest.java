package com.ecommerceportfolio.controllers;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import java.util.ArrayList;

import org.hamcrest.CoreMatchers;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.ecommerceportfolio.EcommerceportfolioApplication;
import com.ecommerceportfolio.controllers.dto.ProductDTO;
import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Product;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.services.ProductService;
import com.ecommerceportfolio.services.StoreService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@SpringBootTest(classes = EcommerceportfolioApplication.class)
@AutoConfigureMockMvc
public class ProductGeneralControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private ProductService productService;

        @MockBean
        private StoreService storeService;

        @MockBean
        private ProductDTO productClient;

        @Autowired
        private ObjectMapper objectMapper;

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
                productClient = new ProductDTO(null, "name", "description", 1.1, "", "", "", 1L, "");
        }

        @Test
        void testGetProductById() throws Exception {
                when(productService.findProductById(anyLong())).thenReturn(product);
                Mockito.when(storeService.findStoreById(anyLong())).thenReturn(store);

                ResultActions response = mockMvc.perform(get("/products/1")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.storeId",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.category",
                                                CoreMatchers.is(product.getCategory())));
        }

        @Test
        void testUpdateProduct() throws JsonProcessingException, Exception {
                when(productService.updateProduct(Mockito.any(Product.class), Mockito.anyLong())).thenReturn(product);
                when(productService.findProductById(anyLong())).thenReturn(product);
                when(storeService.findStoreById(anyLong())).thenReturn(store);

                ProductDTO productClient = new ProductDTO(product);

                ResultActions response = mockMvc.perform(put("/products/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(productClient)));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(product.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.storeId",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.category",
                                                CoreMatchers.is(product.getCategory())));
        }

        @Test
        void testCreateProduct() throws Exception {
                given(productService.saveProduct(ArgumentMatchers.any()))
                                .willAnswer((invocation -> invocation.getArgument(0)));
                Mockito.when(storeService.findStoreById(anyLong())).thenReturn(store);

                ResultActions response = mockMvc.perform(post("/products")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(productClient)));

                response.andExpect(MockMvcResultMatchers.status().isCreated())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.category",
                                                CoreMatchers.is(product.getCategory())));
        }

        @Test
        void testDeleteProductBy() throws Exception {
                Mockito.when(productService.deleteProductById(1L)).thenReturn(product);
                mockMvc.perform(MockMvcRequestBuilders.delete("/products/1"))
                                .andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.storeId",
                                                CoreMatchers.is(Integer
                                                                .valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.category",
                                                CoreMatchers.is(product.getCategory())));
        }

        @Test
        void testGetProducts() throws Exception {
                ArrayList<Product> listProducts = new ArrayList<>();
                listProducts.add(product);

                when(productService.findAllProducts()).thenReturn(listProducts);

                ResultActions response = mockMvc.perform(get("/products")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPages", CoreMatchers.is(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products", Matchers.hasSize(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].name",
                                                CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].storeId",
                                                CoreMatchers.is(Integer.valueOf(product.getStore().getId().toString()))))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].category",
                                                CoreMatchers.is(product.getCategory())));
        }

        @Test
        void testGetProductsPublic() throws Exception {
                ArrayList<Product> listProducts = new ArrayList<>();
                listProducts.add(product);

                Pageable pageable = PageRequest.of(0, 10);
                Page<Product> productsPage = new PageImpl<>(listProducts, pageable, listProducts.size());

                when(productService.findByTextFilterAndCategories(null, null, 0, 10)).thenReturn(productsPage);

                ResultActions response = mockMvc.perform(get("/products/public")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPages", CoreMatchers.is(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products", Matchers.hasSize(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].name",
                                                CoreMatchers.is(store.getName())))

                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].description",
                                                CoreMatchers.is(product.getDescription())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].imageUrl",
                                                CoreMatchers.is(product.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].price",
                                                CoreMatchers.is(product.getPrice())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].currency",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].inventoryStatus",
                                                CoreMatchers.is(product.getInventoryStatus())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.products.[0].category",
                                                CoreMatchers.is(product.getCategory())));
        }

}
