import { Injectable } from '@angular/core';
import { PathData } from '../utils/utilsFunctions';

@Injectable({
  providedIn: 'root'
})
export class NavigationPathService {
  private navigationPath: PathData = {
    storeName: undefined,
    productName: undefined,
    storeId: undefined,
    productId: undefined,
    inStores: false,
    inProducts: false
  }
  constructor() { }

  setInStores(value: boolean): void {
    this.navigationPath.inStores = value;
  }

  setInProducts(value: boolean): void {
    this.navigationPath.inProducts = value;
  }

  setStoreName(value: string | undefined): void {
    this.navigationPath.storeName = value;
  }

  setProductName(value: string | undefined): void {
    this.navigationPath.productName = value;
  }

  setStoreId(value: number | undefined): void {
    this.navigationPath.storeId = value;
  }

  setProductId(value: number | undefined): void {
    this.navigationPath.productId = value;
  }

  getInStores(): boolean {
    return this.navigationPath.inStores;
  }

  getInProducts(): boolean {
    return this.navigationPath.inProducts;
  }

  getStoreName(): string | undefined {
    return this.navigationPath.storeName;
  }

  getProductName(): string | undefined {
    return this.navigationPath.productName;
  }

  getStoreId(): number | undefined {
    return this.navigationPath.storeId;
  }

  getProductId(): number | undefined {
    return this.navigationPath.productId;
  }

}
