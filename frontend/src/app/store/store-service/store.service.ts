import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreDTO } from '../../dto/StoreDTO';
import { ApiStoreService } from './storeInterface';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements ApiStoreService  {
  private apiUrl = 'http://localhost:8080/stores';

  constructor(private http: HttpClient) { }
  getStoresFilterByText(text: string): Observable<StoreDTO[]> {
    return this.http.get<StoreDTO[]>(this.apiUrl+"?textfilter="+text);  
  }

  getStores(): Observable<StoreDTO[]> {
    return this.http.get<StoreDTO[]>(this.apiUrl);  }

  getStore(id: number): Observable<StoreDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<StoreDTO>(url);
  }

  createStore(store: StoreDTO): Observable<StoreDTO> {
    return this.http.post<StoreDTO>(this.apiUrl, store);
  }

  updateStore(id: number, product: StoreDTO): Observable<StoreDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<StoreDTO>(url, product);
  }

  deleteStore(id: number): Observable<StoreDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<StoreDTO>(url);
  }
}
