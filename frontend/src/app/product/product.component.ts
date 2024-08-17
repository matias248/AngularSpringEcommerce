import { Component, Inject, inject, Input } from '@angular/core';
import { ProductService } from './product-service/product.service';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NavigationPathService } from '../navigation-path/navigation-path.service';
import { ProductListDTOwithStoreDTO } from '../dto/ProductDTO';
import { ButtonProps } from '../utils/utilsFunctions';
import { CreateItemButtonComponent } from '../shared/create-item-button/create-item-button.component';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.localdata';
import { HttpClient } from '@angular/common/http';
import { ProductLocalService } from './product-service/product-local.service';
import { ApiProductService } from './product-service/productInterface';
import { LocaldataserviceService } from '../localdataservice.service';
import { SpinnerComponent } from '../svg/spinner/spinner.component';
import { DisplayNotFoundComponent } from '../shared/display-not-found/display-not-found.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, ProductItemComponent, NgIf, CreateItemButtonComponent, SpinnerComponent, DisplayNotFoundComponent],
  templateUrl: './product.component.html',
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
export class ProductComponent {
  title: string = "List of products";
  paginatedProductsWithStore: ProductListDTOwithStoreDTO | undefined = undefined;
  isLoading: boolean = true;

  @Input('id') storeId: string = '';

  constructor(@Inject('ApiProductService') private productService: ApiProductService, private navigationPathService: NavigationPathService, private router: Router) { }

  navigateToCreateNewProduct(): void {
    if (this.storeId !== '')
      this.router.navigate([`/stores/${this.storeId}/products/new`]);
  }

  createNewItemProps: ButtonProps = {
    functionToDo: () => { this.navigateToCreateNewProduct() },
    title: 'Create a product'
  };

  loadProducts(): void {
    let storeId = +this.storeId;
    if (!isNaN(storeId)) {
      this.productService.getProductsFilterByStore(storeId)
        .subscribe({
          next: (response: ProductListDTOwithStoreDTO) => {
            this.paginatedProductsWithStore = (response);
            this.navigationPathService.setInStores(true);
            this.navigationPathService.setInProducts(true);
            this.navigationPathService.setStoreName(response.store.name);
            this.navigationPathService.setProductName(undefined);
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
    this.loadProducts();
  }
}
