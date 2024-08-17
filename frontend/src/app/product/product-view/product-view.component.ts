import { Component, inject, Inject, Input } from '@angular/core';
import { ProductDTO, productKeysToNotDisplayInDetails, ProductWithStore } from '../../dto/ProductDTO';
import { RouterLink } from '@angular/router';
import { CapitalizeAndFormatPipe } from '../../pipe/capitalize-and-format.pipe';
import { NavigationPathService } from '../../navigation-path/navigation-path.service';
import { ApiProductService } from '../product-service/productInterface';
import { environment } from '../../../environments/environment.localdata';
import { ProductLocalService } from '../product-service/product-local.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product-service/product.service';
import { LocaldataserviceService } from '../../localdataservice.service';
import { SpinnerComponent } from '../../svg/spinner/spinner.component';
import { DisplayNotFoundComponent } from '../../shared/display-not-found/display-not-found.component';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [RouterLink, CapitalizeAndFormatPipe, SpinnerComponent, DisplayNotFoundComponent],
  templateUrl: './product-view.component.html',
  providers: [
    {
      provide: 'ApiProductService',
      useFactory: () => {
        if (environment.environmentName === 'localdata') {
          return new ProductLocalService(inject(LocaldataserviceService));
        } else {
          return new ProductService(inject(HttpClient));
        }
      }
    }
  ]
})
export class ProductViewComponent {
  title: string = "Details of the product";

  productWithStore?: ProductWithStore = undefined;
  isLoading: boolean = true;

  @Input('productId') id: string = '';
  @Input('id') storeId: string = '';

  constructor(private navigationPathService: NavigationPathService, @Inject('ApiProductService') private productService: ApiProductService) { }

  loadProduct(idProduct: number, idStore: number): void {
    if (!isNaN(idProduct) && !isNaN(idStore)) {
      this.productService.getProductAndStoreById(idStore, idProduct)
        .subscribe({
          next: (response: ProductWithStore) => {
            this.productWithStore = (response);
            this.navigationPathService.setInProducts(true);
            this.navigationPathService.setInStores(true);
            this.navigationPathService.setStoreName(response.store.name);
            this.navigationPathService.setProductName(response.product.name);
            this.navigationPathService.setProductId(response.product.id);
            this.navigationPathService.setStoreId(response.store.id);
            this.isLoading = false
          },
          error: (error) => {
            this.navigationPathService.setInStores(false);
            this.navigationPathService.setInProducts(false);
            this.navigationPathService.setStoreName(undefined);
            this.navigationPathService.setProductName(undefined);
            this.navigationPathService.setStoreId(undefined);
            this.navigationPathService.setProductId(undefined);
            this.isLoading = false
          },
        });
    }

  }

  ngOnInit(): void {
    this.loadProduct(+this.id, +this.storeId);
  }

  objectKeys(value: ProductDTO | undefined) {
    return value ? Object.keys(value).filter((element) => { return !productKeysToNotDisplayInDetails.includes(element) }) : [];
  }

  getAttributeValue(obj: ProductDTO | undefined, key: string): any {
    if (obj && key in obj) {
      return obj[key as keyof ProductDTO];
    } else {
      throw new Error(`Key '${key}' does not exist on type 'ProductDTO'`);
    }
  }
}
