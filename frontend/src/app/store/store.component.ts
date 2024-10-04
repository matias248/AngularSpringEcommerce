import { Component, Inject, inject, } from '@angular/core';
import { StoreService } from './store-service/store.service';
import { StoreDTO } from '../dto/StoreDTO';
import { NgFor } from '@angular/common';
import { StoreItemComponent } from './store-item/store-item.component';
import { NavigationPathService } from '../navigation-path/navigation-path.service';
import { ButtonProps } from '../utils/utilsFunctions';
import { Router } from '@angular/router';
import { CreateItemButtonComponent } from '../shared/create-item-button/create-item-button.component';
import { ApiStoreService } from './store-service/storeInterface';
import { HttpClient } from '@angular/common/http';
import { StoreLocalService } from './store-service/store-local.service';
import { environment } from '../../environments/environment';
import { LocaldataserviceService } from '../localdataservice.service';
import { DisplayNotFoundComponent } from '../shared/display-not-found/display-not-found.component';
import { SpinnerComponent } from '../svg/spinner/spinner.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [NgFor, StoreItemComponent, CreateItemButtonComponent, DisplayNotFoundComponent, SpinnerComponent],
  templateUrl: './store.component.html',
  providers: [
    {
      provide: 'ApiService',
      useFactory: () => {
        if (environment.environmentName === 'localdata') {
          return new StoreLocalService(inject(LocaldataserviceService));
        } else {
          return new StoreService(inject(HttpClient));
        }
      }
    }
  ]
})
export class StoreComponent {
  title: string = "List of stores";

  stores?: StoreDTO[];
  isLoading: boolean = true;

  constructor(@Inject('ApiService') private storeService: ApiStoreService, private navigationPathService: NavigationPathService, private router: Router) { }

  navigateToCreateNewStore(): void {
    this.router.navigate([`/stores/new`]);
  }

  createNewItemProps: ButtonProps = {
    functionToDo: () => { this.navigateToCreateNewStore() },
    title: 'Create a store'
  };

  loadStores(): void {
    this.storeService.getStores()
      .subscribe({
        next: (response: StoreDTO[]) => {
          this.stores = (response);
          this.navigationPathService.setInProducts(false);
          this.navigationPathService.setInStores(false);
          this.navigationPathService.setStoreName(undefined);
          this.navigationPathService.setProductName(undefined);
          this.navigationPathService.setProductId(undefined);
          this.navigationPathService.setStoreId(undefined);
          this.isLoading = false;
        },
        error: (error) => {
          this.navigationPathService.setInStores(false);
          this.navigationPathService.setInProducts(false);
          this.navigationPathService.setStoreName(undefined);
          this.navigationPathService.setProductName(undefined);
          this.navigationPathService.setStoreId(undefined);
          this.navigationPathService.setProductId(undefined);
          this.isLoading = false;
        },
      });
  }

  ngOnInit(): void {
    this.loadStores();
  }
}
