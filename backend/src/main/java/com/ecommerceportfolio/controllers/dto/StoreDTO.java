package com.ecommerceportfolio.controllers.dto;

import com.ecommerceportfolio.entities.Address;
import com.ecommerceportfolio.entities.Location;
import com.ecommerceportfolio.entities.Store;

public class StoreDTO {

    private Long id;
    private String name;
    private String contactPhone;
    private String imageUrl;
    private Address address;
    private Location location;


public StoreDTO() {}

public StoreDTO(Store store) {
    this.id = store.getId();
    this.name = store.getName();
    this.contactPhone = store.getContactPhone();
    this.imageUrl = store.getImageUrl();
    this.address = store.getAddress();
    this.location = store.getLocation();
}

public StoreDTO(Long id, String name, String contactPhone, String imageUrl, Address address, Location location) {
    this.id = id;
    this.name = name;
    this.contactPhone = contactPhone;
    this.imageUrl = imageUrl;
    this.address = address;
    this.location = location;
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getImageUrl() {
    return imageUrl;
}

public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}

public String getContactPhone() {
    return contactPhone;
}

public void setContactPhone(String contactPhone) {
    this.contactPhone = contactPhone;
}

public Address getAddress() {
    return address;
}

public void setAddress(Address address) {
    this.address = address;
}

public Location getLocation() {
    return location;
}

public void setLocation(Location location) {
    this.location = location;
}

}