package com.ecommerceportfolio.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerceportfolio.controllers.dto.StoreDTO;
import com.ecommerceportfolio.entities.Store;
import com.ecommerceportfolio.services.StoreService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stores")
@CrossOrigin(origins = "*")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("")
    public ResponseEntity<List<StoreDTO>> getStores(
            @RequestParam(required = false) String textfilter) {

        List<Store> stores = storeService.findStoresByName(textfilter);
        List<StoreDTO> storesDTO = stores.stream().map(store -> new StoreDTO(store))
                .collect(Collectors.toList());

        return ResponseEntity.ok(storesDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDTO> getStoreById(@PathVariable("id") Long id) {
        Store store = storeService.findStoreById(id);
        if (store == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        StoreDTO storeDTO = new StoreDTO(store);
        return new ResponseEntity<>(storeDTO, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<StoreDTO> createStore(@RequestBody Store store) {
        Store savedStore = storeService.saveStore(store);
        StoreDTO storeDTO = new StoreDTO(savedStore);
        return new ResponseEntity<>(storeDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreDTO> updateStore(@PathVariable("id") Long id, @RequestBody Store store) {
        Store currentStore = storeService.updateStore(store, id);
        StoreDTO storeDTO = new StoreDTO(currentStore);
        if (currentStore == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(storeDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStore(@PathVariable("id") Long id) {
        Store Store = storeService.deleteStoreById(id);
        if (Store == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}