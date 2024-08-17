package com.ecommerceportfolio.controllers;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import org.hamcrest.CoreMatchers;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.ecommerceportfolio.EcommerceportfolioApplication;
import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.services.StoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;

import org.springframework.http.MediaType;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest(classes = EcommerceportfolioApplication.class)
@AutoConfigureMockMvc
public class StoreControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private StoreService storeService;

        @Autowired
        private ObjectMapper objectMapper;

        Address address;
        Location location;
        Store store;

        @BeforeEach
        public void init() {
                address = new Address("snumber", "sname", "city", "state", "zipcode");
                location = new Location(1.1, 1.1);
                store = new Store(null, "name", "", "", address, location);
        }

        @Test
        void testCreateStore() throws Exception {
                given(storeService.saveStore(ArgumentMatchers.any()))
                                .willAnswer((invocation -> invocation.getArgument(0)));

                ResultActions response = mockMvc.perform(post("/stores")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(store)));

                response.andExpect(MockMvcResultMatchers.status().isCreated())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.contactPhone",
                                                CoreMatchers.is(store.getContactPhone())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(store.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.streetNumber",
                                                CoreMatchers.is(address.getStreetNumber())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.streetName",
                                                CoreMatchers.is(address.getStreetName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.city",
                                                CoreMatchers.is(address.getCity())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.state",
                                                CoreMatchers.is(address.getState())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.zipCode",
                                                CoreMatchers.is(address.getZipCode())));
        }

        @Test
        void testDeleteStore() throws Exception {
                Mockito.when(storeService.deleteStoreById(1L)).thenReturn(store);
                mockMvc.perform(MockMvcRequestBuilders.delete("/stores/1"))
                                .andExpect(MockMvcResultMatchers.status().isNoContent());
        }

        @Test
        void testGetStores() throws Exception {
                ArrayList<Store> listStores = new ArrayList<>();
                listStores.add(store);

                when(storeService.findStoresByName(null)).thenReturn(listStores);

                ResultActions response = mockMvc.perform(get("/stores")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name",
                                                CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].contactPhone",
                                                CoreMatchers.is(store.getContactPhone())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].imageUrl",
                                                CoreMatchers.is(store.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].address.streetNumber",
                                                CoreMatchers.is(address.getStreetNumber())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].address.streetName",
                                                CoreMatchers.is(address.getStreetName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].address.city",
                                                CoreMatchers.is(address.getCity())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].address.state",
                                                CoreMatchers.is(address.getState())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$[0].address.zipCode",
                                                CoreMatchers.is(address.getZipCode())));
        }

        @Test
        void testGetStoreById() throws Exception {

                when(storeService.findStoreById(anyLong())).thenReturn(store);

                ResultActions response = mockMvc.perform(get("/stores/1")
                                .contentType(MediaType.APPLICATION_JSON));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.contactPhone",
                                                CoreMatchers.is(store.getContactPhone())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(store.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.streetNumber",
                                                CoreMatchers.is(address.getStreetNumber())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.streetName",
                                                CoreMatchers.is(address.getStreetName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.city",
                                                CoreMatchers.is(address.getCity())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.state",
                                                CoreMatchers.is(address.getState())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.zipCode",
                                                CoreMatchers.is(address.getZipCode())));
        }

        @Test
        void testUpdateStore() throws Exception {
                when(storeService.updateStore(Mockito.any(Store.class), Mockito.anyLong())).thenReturn(store);

                ResultActions response = mockMvc.perform(put("/stores/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(store)));

                response.andExpect(MockMvcResultMatchers.status().isOk())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(store.getName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.contactPhone",
                                                CoreMatchers.is(store.getContactPhone())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrl",
                                                CoreMatchers.is(store.getImageUrl())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.streetNumber",
                                                CoreMatchers.is(address.getStreetNumber())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.streetName",
                                                CoreMatchers.is(address.getStreetName())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.city",
                                                CoreMatchers.is(address.getCity())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.state",
                                                CoreMatchers.is(address.getState())))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.address.zipCode",
                                                CoreMatchers.is(address.getZipCode())));
        }
}
