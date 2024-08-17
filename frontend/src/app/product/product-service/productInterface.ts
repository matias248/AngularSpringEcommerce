import { Observable } from "rxjs";
import { ProductDTO, ProductListDTO, ProductListDTOwithStoreDTO, ProductWithStore } from "../../dto/ProductDTO";

export interface ApiProductService {
      
      getProducts(): Observable<ProductListDTO>;

      getProductsPublic(categories: string[], pageIndex: number, elementsPerPage: number, textFilter: string, storeId?: number): Observable<ProductListDTO> ;
    
      getProductsFilterByStore(storeId: number): Observable<ProductListDTOwithStoreDTO>;
      
      getProductAndStoreById(storeId: number, productId: number): Observable<ProductWithStore>;
    
      getProduct(id: number): Observable<ProductDTO>;
    
      createProduct(product: ProductDTO): Observable<ProductDTO>;
    
      updateProduct(id: number, product: ProductDTO): Observable<ProductDTO>;
    
      deleteProduct(id: number): Observable<ProductDTO>;
}