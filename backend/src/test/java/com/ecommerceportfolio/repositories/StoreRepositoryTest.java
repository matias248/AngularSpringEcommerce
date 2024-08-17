package com.ecommerceportfolio.repositories;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Store;
import org.assertj.core.api.Assertions;

import java.util.List;

@DataJpaTest
public class StoreRepositoryTest {

        @Autowired
        StoreRepository storeRepository;

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
        void testIfTextFilterWorks() {
                storeRepository.save(store);

                List<Store> stores = storeRepository.findStoresByName("name");
                List<Store> stores2 = storeRepository.findStoresByName("randomName");         

                Assertions.assertThat(stores)
                                .containsExactlyInAnyOrder(
                                                store);
                Assertions.assertThat(stores2)
                                .containsExactlyInAnyOrder();
        }


}
