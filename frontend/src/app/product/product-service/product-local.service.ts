import { Injectable } from '@angular/core';
import { ApiProductService } from './productInterface';
import { Observable, of, throwError } from 'rxjs';
import { ProductListDTO, ProductListDTOwithStoreDTO, ProductWithStore, ProductDTO, inventoryStatusType } from '../../dto/ProductDTO';
import { StoreDTO } from '../../dto/StoreDTO';
import { LocaldataserviceService } from '../../localdataservice.service';
import { calculateTotalPages, getPaginatedItems, productAccordingToTheFilter } from '../../utils/utilsFunctions';

@Injectable({
  providedIn: 'root'
})
export class ProductLocalService implements ApiProductService {

  constructor(private localDataService: LocaldataserviceService) { }

  getProducts(): Observable<ProductListDTO> {
    let productListDTO: ProductListDTO = {
      products: this.localDataService.products
      , totalPages: 1
    }
    return of(productListDTO);
  }
  getProductsPublic(categories: string[], pageIndex: number, elementsPerPage: number, textFilter: string, storeId?: number): Observable<ProductListDTO> {
    
    const productsFiltered = this.localDataService.products.filter((product) => {
      return (categories.includes(product.category) || categories.length === 0) && product.inventoryStatus !== inventoryStatusType.OUTOFSTOCK && productAccordingToTheFilter(product, textFilter, storeId)
    });
    let productListDTO: ProductListDTO = {
      products: getPaginatedItems(productsFiltered, pageIndex - 1, elementsPerPage), totalPages: calculateTotalPages(productsFiltered.length, elementsPerPage)
    }
    return of(productListDTO)
  }

  getProductsFilterByStore(storeId: number): Observable<ProductListDTOwithStoreDTO> {
    const store: StoreDTO | undefined = this.localDataService.stores.find((store) => { return store.id === storeId });
    if (store) {
      const filterProducts = this.localDataService.products.filter((product) => product.storeId === storeId);
      let productListDTO: ProductListDTO = { products: filterProducts, totalPages: 1 }
      let productListDTOwithStoreDTO: ProductListDTOwithStoreDTO = {
        productListDTO: productListDTO,
        store: store,
      };
      return of(productListDTOwithStoreDTO);
    }
    return throwError(() => new Error('store not found!'));
  }

  getProductAndStoreById(storeId: number, productId: number): Observable<ProductWithStore> {
    const store: StoreDTO | undefined = this.localDataService.stores.find((store) => { return store.id === storeId });
    if (store) {
      const product = this.localDataService.products.find((product) => { return product.id === productId && store.id === product.storeId });
      if (product) {
        let productWithStore: ProductWithStore = {
          product: product,
          store: store,
        };
        return of(productWithStore);
      }
      else {
        return throwError(() => new Error('product not found!'));
      }
    }
    return throwError(() => new Error('store not found!'));
  }

  getProduct(id: number): Observable<ProductDTO> {
    const product = this.localDataService.products.find((product) => { return product.id === id });
    if (product) {
      return of(product);
    }
    throw new Error('product not found!');
  }

  createProduct(product: ProductDTO): Observable<ProductDTO> {
    const newId = this.localDataService.products.length > 0 ? Math.max(...this.localDataService.products.map(j => j.id)) + 1 : 1;
    const productDTO: ProductDTO = { ...product };
    productDTO.id = newId;
    this.localDataService.addProduct(productDTO);
    return of(productDTO);
  }

  updateProduct(id: number, product: ProductDTO): Observable<ProductDTO> {
    const index = this.localDataService.products.findIndex(s => s.id === id);
    if (index !== -1) {
      let newProduct: ProductDTO = product;
      newProduct.id = id;
      return of(this.localDataService.updateProduct(newProduct, index));
    }
    throw new Error('product not found!');
  }

  deleteProduct(id: number): Observable<ProductDTO> {
    const index = this.localDataService.products.findIndex(j => j.id === id);
    if (index !== -1) {
      let deletedProduct = this.localDataService.products[index];
      this.localDataService.deleteProduct(index);
      return of(deletedProduct);
    }
    throw new Error('Product not found');
  }
}
