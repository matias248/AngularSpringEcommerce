package com.ecommerceportfolio.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.repositories.StoreRepository;

import java.lang.reflect.Field;
import java.util.ArrayList;

@Service
public class StoreService {

    @Autowired
    StoreRepository storeRepository;

    public Store saveStore(Store store) {
        if (store == null) {
            throw new IllegalArgumentException("Store must not be null");
        }
        return storeRepository.save(store);
    }

    public ArrayList<Store> findAllStores() {
        Iterable<Store> stores = storeRepository.findAll();
        ArrayList<Store> StoresList = new ArrayList<>();
        stores.forEach(StoresList::add);
        return StoresList;
    }

    public long countStores() {
        return storeRepository.count();
    }

    public Store findStoreById(Long id) {
        return storeRepository.findById(id).orElse(null);
    }

    public Store updateStore(Store store, Long id) {
        Store currentStore = storeRepository.findById(id).orElse(null);
        if (store == null || currentStore == null) {
            return null;
        }
        Field[] fields = store.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                if ("id".equals(field.getName())) {
                    continue;
                }
                Object newValue = field.get(store);

                if (newValue != null) {
                    field.set(currentStore, newValue);
                }

            } catch (IllegalAccessException e) {
                throw new RuntimeException("Error when access to the fields", e);
            }
        }

        return storeRepository.save(currentStore);
    }

    public Store deleteStoreById(Long id) {
        Store store = storeRepository.findById(id).orElse(null);
        if (store == null) {
            return null;
        }
        storeRepository.delete(store);
        return store;
    }

    public ArrayList<Store> findStoresByName(String name) {
        Iterable<Store> stores = storeRepository.findStoresByName(name);
        ArrayList<Store> StoresList = new ArrayList<>();
        stores.forEach(StoresList::add);
        return StoresList;
    }

}
