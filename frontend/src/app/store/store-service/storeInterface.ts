import { Observable } from "rxjs/internal/Observable";
import { StoreDTO } from "../../dto/StoreDTO";

export interface ApiStoreService {
    getStores(): Observable<StoreDTO[]>;
    getStoresFilterByText(text:string): Observable<StoreDTO[]>;
    getStore(id: number): Observable<StoreDTO>;
    createStore(store: StoreDTO): Observable<StoreDTO>;
    updateStore(id: number, store: StoreDTO): Observable<StoreDTO> ;
    deleteStore(id: number): Observable<StoreDTO>;
}
