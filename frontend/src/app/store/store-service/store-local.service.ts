import { Injectable } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';
import { Observable, of } from 'rxjs';
import { ApiStoreService } from './storeInterface';
import { LocaldataserviceService } from '../../localdataservice.service';
import { filterStores } from '../../utils/utilsFunctions';

@Injectable({
  providedIn: 'root'
})
export class StoreLocalService implements ApiStoreService {

  constructor(private localDataService: LocaldataserviceService) { }

  getStoresFilterByText(text: string): Observable<StoreDTO[]> {
    return of(filterStores(this.localDataService.stores, text));
  }

  updateStore(id: number, store: StoreDTO): Observable<StoreDTO> {
    const index = this.localDataService.stores.findIndex(s => s.id === id);
    if (index !== -1) {
      let newStore: StoreDTO = store;
      newStore.id = id;
      return of(this.localDataService.updateStore(newStore, index));
    }
    throw new Error('Store not found!');
  }

  getStores(): Observable<StoreDTO[]> {
    return of(this.localDataService.stores);
  }
  getStore(id: number): Observable<StoreDTO> {
    const store = this.localDataService.stores.find(s => s.id === id);
    if (store)
      return of(store);
    throw new Error('Store not found!');
  }
  createStore(store: StoreDTO): Observable<StoreDTO> {
    const newId = this.localDataService.stores.length > 0 ? Math.max(...this.localDataService.stores.map(j => j.id)) + 1 : 1;
    const storeDTO: StoreDTO = { ...store };
    storeDTO.id = newId;
    this.localDataService.addStore(storeDTO)
    return of(store);
  }

  deleteStore(id: number): Observable<StoreDTO> {
    const index = this.localDataService.stores.findIndex(j => j.id === id);
    if (index !== -1) {
      let deletedStore = this.localDataService.stores[index];
      this.localDataService.deleteStore(index);
      this.localDataService.products.filter((product) => {
        return product.storeId === deletedStore.id;
      })
      this.localDataService.deleteProduct
      return of(deletedStore);
    }
    throw new Error('Store not found!');
  }
}
