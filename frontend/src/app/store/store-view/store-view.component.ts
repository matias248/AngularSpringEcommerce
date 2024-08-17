import { Component, Inject, inject, Input } from '@angular/core';
import { StoreDTO, storesKeysToNotDisplayInDetails } from '../../dto/StoreDTO';
import { StoreService } from '../store-service/store.service';
import { TypeofPipe } from '../../pipe/typeof.pipe';
import { RouterLink } from '@angular/router';
import { CapitalizeAndFormatPipe } from '../../pipe/capitalize-and-format.pipe';
import { NavigationPathService } from '../../navigation-path/navigation-path.service';
import { environment } from '../../../environments/environment.localdata';
import { HttpClient } from '@angular/common/http';
import { StoreLocalService } from '../store-service/store-local.service';
import { ApiStoreService } from '../store-service/storeInterface';
import { LocaldataserviceService } from '../../localdataservice.service';
import { DisplayNotFoundComponent } from '../../shared/display-not-found/display-not-found.component';
import { SpinnerComponent } from '../../svg/spinner/spinner.component';

@Component({
  selector: 'app-store-view',
  standalone: true,
  imports: [TypeofPipe, RouterLink, CapitalizeAndFormatPipe, DisplayNotFoundComponent, SpinnerComponent],
  templateUrl: './store-view.component.html',
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
export class StoreViewComponent {
  title: string = "Details of the store";

  store?: StoreDTO = undefined;
  isLoading: boolean = true;

  @Input() id: string = '';

  constructor(@Inject('ApiService') private storeService: ApiStoreService, private navigationPathService: NavigationPathService) { }

  loadStore(): void {
    let id = +this.id;
    if (!isNaN(id)) {
      this.storeService.getStore(+this.id)
        .subscribe({
          next: (response: StoreDTO) => {
            this.store = (response);
            this.navigationPathService.setInProducts(false);
            this.navigationPathService.setInStores(true);
            this.navigationPathService.setStoreName(response.name);
            this.navigationPathService.setProductName(undefined);
            this.navigationPathService.setProductId(undefined);
            this.navigationPathService.setStoreId(response.id);
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
  }

  ngOnInit(): void {
    this.loadStore();
  }

  objectKeys(value: any) {
    return Object.keys(value).filter((element) => { return !storesKeysToNotDisplayInDetails.includes(element) });
  }

  getAttributeValue(obj: StoreDTO, key: string): any {
    if (key in obj) {
      return obj[key as keyof StoreDTO];
    } else {
      throw new Error(`Key '${key}' does not exist on type 'StoreDTO'`);
    }
  }

}
