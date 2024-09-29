import { Injectable } from '@angular/core';
import { StoreDTO } from './dto/StoreDTO';
import { ProductDTO } from './dto/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class LocaldataserviceService {

  constructor() { }

  products: ProductDTO[] = [
    {
      "id": 1,
      "name": "Simple Watch",
      "description": "Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.",
      "imageUrl": "assets/watch.jpeg",
      "price": 65,
      "category": "Accessories",
      "inventoryStatus": "INSTOCK",
      "storeId": 1,
      "currency": "€"
    },
    {
      "id": 2,
      "name": "Simple Shirt",
      "description": "Discover effortless style with the Simple Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
      "imageUrl": "assets/shirt.jpeg",
      "price": 72,
      "category": "Clothing",
      "inventoryStatus": "INSTOCK",
      "storeId": 1,
      "currency": "€"
    }, {
      "id": 3,
      "name": "Neo Shirt",
      "description": "Discover effortless style with the Neo Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
      "imageUrl": "assets/shirt.jpeg",
      "price": 72,
      "category": "Clothing",
      "inventoryStatus": "INSTOCK",
      "storeId": 2,
      "currency": "€"
    },
  ];
  stores: StoreDTO[] = [
    {
      id: 1,
      name: "Simple Store",
      address: {
        streetNumber: "0",
        streetName: "Street Name",
        city: "Simple City D.C",
        state: "Simple Country",
        zipCode: "31000",
      },
      location: {
        latitude: 1,
        longitude: 2,
      },
      contactPhone: "+33 123456",
      imageUrl: "assets/store1.jpeg"
    },
    {
      id: 2,
      name: "Neo store",
      address: {
        streetNumber: "0",
        streetName: "Street Name",
        city: "Neo City",
        state: "Neo Country",
        zipCode: "31000",
      },
      location: {
        latitude: 1,
        longitude: 2,
      },
      contactPhone: "+33 123456",
      imageUrl: "assets/store2.jpeg"
    },
  ];

  getProducts(): ProductDTO[] {
    return this.products;
  }

  addProduct(product: ProductDTO) {
    this.products.push(product);
  }

  updateStore(store: StoreDTO, index: number) {
    if (index >= 0 && index < this.stores.length) {
      this.stores[index] = store;
    }
    return store;
  }
  getStores(): StoreDTO[] {
    return this.stores;
  }

  addStore(store: StoreDTO) {
    this.stores.push(store);
  }

  updateProduct(product: ProductDTO, index: number) {
    if (index >= 0 && index < this.products.length) {
      this.products[index] = product;
    }
    return this.products[index];
  }

  deleteProduct(index: number) {
    if (index >= 0 && index < this.products.length) {
      this.products.splice(index, 1);
    }

  }
  deleteProductByStoreId(id: number) {
    this.products = this.products.filter((product) => {
      return product.storeId != id;
    })
  }

  deleteStore(index: number) {
    if (index >= 0 && index < this.stores.length) {
      this.stores.splice(index, 1);
    }
  }
}
