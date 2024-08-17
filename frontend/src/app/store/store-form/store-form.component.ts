import { ChangeDetectorRef, Component, Inject, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CancelButtonComponent } from '../../shared/cancel-button/cancel-button.component';
import { DeleteButtonComponent } from '../../shared/delete-button/delete-button.component';
import { InputNumberFormComponent } from '../../shared/input-number-form/input-number-form.component';
import { InputStringFormComponent } from '../../shared/input-string-form/input-string-form.component';
import { InputSwitchFormComponent } from '../../shared/input-switch-form/input-switch-form.component';
import { InputUrlImageFormComponent } from '../../shared/input-url-image-form/input-url-image-form.component';
import { ValidateButtonComponent } from '../../shared/validate-button/validate-button.component';
import { Router } from '@angular/router';
import { StoreService } from '../store-service/store.service';
import { NavigationPathService } from '../../navigation-path/navigation-path.service';
import { StoreDTO } from '../../dto/StoreDTO';
import { NAME_RESTRICTION, REGEX, nameRestrictionMessage, onlyNumbersRestrictionMessage } from '../../constants';
import { ButtonProps, InputFormProps, InputTextFormProps } from '../../utils/utilsFunctions';
import { Address } from '../../dto/Address';
import { GeoPoint } from '../../dto/GeoPoint';
import { FormDirective } from '../../directives/focus-invalid-input.directive';
import { environment } from '../../../environments/environment.localdata';
import { StoreLocalService } from '../store-service/store-local.service';
import { HttpClient } from '@angular/common/http';
import { ApiStoreService } from '../store-service/storeInterface';
import { LocaldataserviceService } from '../../localdataservice.service';
import { DisplayNotFoundComponent } from '../../shared/display-not-found/display-not-found.component';
import { SpinnerComponent } from '../../svg/spinner/spinner.component';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberFormComponent, FormDirective,
    InputStringFormComponent, InputSwitchFormComponent, ValidateButtonComponent, CancelButtonComponent, DeleteButtonComponent, InputUrlImageFormComponent,DisplayNotFoundComponent, SpinnerComponent],
  templateUrl: './store-form.component.html',
  providers: [
    {
      provide: 'ApiStoreService',
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
export class StoreFormComponent {

  @Input('id') storeId: string | undefined = undefined;
  store?: StoreDTO = undefined;
  title: string = '';
  isLoading: boolean = true;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private router: Router, @Inject('ApiStoreService') private storeService: ApiStoreService, private navigationPathService: NavigationPathService) { }

  loadStore(): void {
    let id = this.storeId ? +this.storeId : NaN;
    if (!isNaN(id)) {
      this.storeService.getStore(id)
        .subscribe({
          next: (response: StoreDTO) => {
            this.store = (response);
            this.navigationPathService.setInProducts(false);
            this.navigationPathService.setInStores(true);
            this.navigationPathService.setStoreName(response.name);
            this.navigationPathService.setProductName(undefined);
            this.navigationPathService.setProductId(undefined);
            this.navigationPathService.setStoreId(response.id);
            this.form.patchValue(
              {
                name: response.name,
                imageUrl: response.imageUrl,
                city: response.address.city,
                state: response.address.state,
                zipCode: response.address.zipCode,
                streetNumber: response.address.streetNumber,
                streetName: response.address.streetName,
                latitude: response.location.latitude + '',
                longitude: response.location.longitude + '',
              })
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

  updateStore(idStore: number, store: StoreDTO): void {
    if (!isNaN(idStore)) {
      this.storeService.updateStore(idStore, store)
        .subscribe({
          next: (response: StoreDTO) => {
            this.router.navigate([`/stores`]);

          },
          error: (error) => {
            console.error('Error when updating the stores:', error)
          },
        });
    }
  }

  createStore(store: StoreDTO, idStore: number): void {
    let storeToSent = { ...store };
    this.storeService.createStore(storeToSent)
      .subscribe({
        next: (response: StoreDTO) => {
          this.router.navigate([`/stores`]);
        },
        error: (error) => {
          console.error('Error when create a store:', error)
        },
      });
  }

  deleteStore(productId: number, idStore: number): void {
    this.storeService.deleteStore(productId)
      .subscribe({
        next: (response: StoreDTO) => {
          this.router.navigate([`/stores`]);
        },
        error: (error) => {
          console.error('Error when deleting a store:', error)
        },
      });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.title = this.storeId !== undefined ? "Edit the store" : "Create a new store";
    if (this.storeId && this.storeId)
      this.loadStore();
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      let idStore: number = +(this.storeId ?? NaN);
      let address: Address = {
        streetNumber: this.form.controls.streetNumber.value,
        streetName: this.form.controls.streetName.value,
        city: this.form.controls.city.value,
        state: this.form.controls.state.value,
        zipCode: this.form.controls.zipCode.value
      };
      let location: GeoPoint = {
        latitude: +this.form.controls.latitude.value,
        longitude: +this.form.controls.longitude.value
      };
      let store: StoreDTO = {
        id: idStore,
        name: this.form.controls.name.value,
        address: address,
        location: location,
        contactPhone: ''
      };
      if (!isNaN(idStore)) {
        this.updateStore(idStore, store);
      }
      else {
        this.createStore(store, idStore);
      }
    }
  }

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(NAME_RESTRICTION)]],
    imageUrl: '',
    city: ['', [Validators.required, Validators.maxLength(NAME_RESTRICTION)]],
    state: ['', [Validators.required, Validators.maxLength(NAME_RESTRICTION)]],
    zipCode: ['', [Validators.required, Validators.maxLength(NAME_RESTRICTION)]],
    streetNumber: ['', [Validators.required, Validators.pattern(REGEX.NUMBERS_DOTS_COMMAS)]],
    streetName: ['', [Validators.required, Validators.maxLength(NAME_RESTRICTION)]],
    latitude: ['0', [Validators.required, Validators.pattern(REGEX.LATITUDE)]],
    longitude: ['0', [Validators.required, Validators.pattern(REGEX.LONGITUDE)]],
  })

  imageUrlInputProps: InputFormProps = {
    title: 'URL',
    formControl: this.form.controls.imageUrl,
    required: false,
  };

  nameInputProps: InputTextFormProps = {
    title: 'Name',
    formControl: this.form.controls.name,
    required: true,
    numberOfLines: 1,
    helpText: nameRestrictionMessage,
  };

  cityInputProps: InputTextFormProps = {
    title: 'City',
    formControl: this.form.controls.city,
    required: true,
    numberOfLines: 1,
    helpText: nameRestrictionMessage,
  };

  stateInputProps: InputTextFormProps = {
    title: 'State',
    formControl: this.form.controls.state,
    required: true,
    numberOfLines: 1,
    helpText: nameRestrictionMessage,
  };

  zipCodeInputProps: InputTextFormProps = {
    title: 'Zipcode',
    formControl: this.form.controls.zipCode,
    required: true,
    numberOfLines: 1,
    helpText: nameRestrictionMessage,
  };

  streetNumberInputProps: InputFormProps = {
    title: 'Street Number',
    formControl: this.form.controls.streetNumber,
    required: true,
    helpText: onlyNumbersRestrictionMessage

  };

  streetNameInputProps: InputTextFormProps = {
    title: 'Street Name',
    formControl: this.form.controls.streetName,
    required: true,
    numberOfLines: 1,
    helpText: nameRestrictionMessage,
  };

  latitudeInputProps: InputFormProps = {
    title: 'Latitude',
    formControl: this.form.controls.latitude,
    required: true,
    helpText: onlyNumbersRestrictionMessage

  };

  longitudeInputProps: InputTextFormProps = {
    title: 'Longitude',
    formControl: this.form.controls.longitude,
    required: true,
    numberOfLines: 1,
    helpText: onlyNumbersRestrictionMessage,
  };

  validateButton: ButtonProps = {
    functionToDo: () => { },
    title: 'Submit'
  };

  cancelButton: ButtonProps = {
    functionToDo: () => {
      if (this.storeId)
        this.router.navigate([`/stores`]);
    },
    title: 'Cancel'
  };

  deleteButton: ButtonProps = {
    functionToDo: () => {
      if (this.storeId !== undefined && this.storeId !== undefined)
        this.deleteStore(+this.storeId, +this.storeId)
    },
    title: 'Delete Store'
  };
}
