import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO, ProductListDTO, ProductListDTOwithStoreDTO, ProductWithStore } from '../../dto/ProductDTO';
import { ApiProductService } from './productInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ApiProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductListDTO> {
    return this.http.get<ProductListDTO>(this.apiUrl);
  }

  getProductsPublic(categories: string[], pageIndex: number, elementsPerPage: number, textFilter: string, storeId?: number): Observable<ProductListDTO> {
    console.log("" + categories+"j" + pageIndex +"a"+ elementsPerPage + textFilter)
    const url = `${this.apiUrl}/public?categories=${categories}&page=${pageIndex}&pagelength=${elementsPerPage}&textfilter=${textFilter}${storeId ? "&storeid=" + storeId : ""}`;
    return this.http.get<ProductListDTO>(url);
  }

  getProductsFilterByStore(storeId: number): Observable<ProductListDTOwithStoreDTO> {
    const url = `http://localhost:8080/stores/${storeId}/products`;
    return this.http.get<ProductListDTOwithStoreDTO>(url);
  }

  getProductAndStoreById(storeId: number, productId: number): Observable<ProductWithStore> {
    const url = `http://localhost:8080/stores/${storeId}/products/${productId}`;
    return this.http.get<ProductWithStore>(url);
  }

  getProduct(id: number): Observable<ProductDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProductDTO>(url);
  }

  createProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductDTO): Observable<ProductDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ProductDTO>(url, product);
  }

  deleteProduct(id: number): Observable<ProductDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ProductDTO>(url);
  }
}
