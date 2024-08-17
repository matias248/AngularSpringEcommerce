package com.ecommerceportfolio.services;

import static org.mockito.Mockito.when;

import java.util.Optional;
import static org.mockito.BDDMockito.given;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.ecommerceportfolio.EcommerceportfolioApplication;
import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.repositories.StoreRepository;


@SpringBootTest(classes = EcommerceportfolioApplication.class)
public class StoreServiceTest {

    @Mock
    private StoreRepository storeRepository;

    @InjectMocks
    private StoreService storeService;

    Address address;
    Location location;
    Store store;

    @BeforeEach
    public void init() {
        address = new Address("snumber", "sname", "city", "state", "zipcode");
        location = new Location(1.1, 1.1);
        store = new Store(null, "name", "", "", address, location);
        store.setId(1L);
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateStore() {
        Address address2 = new Address("snumber", "sname", "city", "state", "zipcode");
        Location location2 = new Location(1.1, 1.1);
        Store store2 = new Store(null, "Newname", "+33 123456721", "new", address2, location2);

        Optional<Store> optionalStore = Optional.of(store);

        when(storeRepository.findById(Mockito.anyLong())).thenReturn(optionalStore);
        given(storeRepository.save(ArgumentMatchers.any()))
                .willAnswer((invocation -> invocation.getArgument(0)));
        Store storeResponse = storeService.updateStore(store2, store.getId());

        Assertions.assertThat(storeResponse.getId()).isEqualTo(1L);
        Assertions.assertThat(storeResponse.getContactPhone()).isEqualTo("+33 123456721");
        Assertions.assertThat(storeResponse.getImageUrl()).isEqualTo("new");
        Assertions.assertThat(storeResponse.getName()).isEqualTo("Newname");
        Assertions.assertThat(storeResponse.getAddress()).isEqualTo(address2);
        Assertions.assertThat(storeResponse.getLocation()).isEqualTo(location2);

    }
}
