import { ChangeDetectorRef, Component, Inject, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberFormComponent } from '../../shared/input-number-form/input-number-form.component';
import { ButtonProps, InputFormProps, InputSwitchFormProps, InputTextFormProps } from '../../utils/utilsFunctions';
import { InputStringFormComponent } from '../../shared/input-string-form/input-string-form.component';
import { InputSwitchFormComponent } from '../../shared/input-switch-form/input-switch-form.component';
import { arrayCategoryType, arrayCurrencyType, arrayInventoryStatusType, ProductDTO, ProductWithStore } from '../../dto/ProductDTO';
import { ValidateButtonComponent } from '../../shared/validate-button/validate-button.component';
import { CancelButtonComponent } from '../../shared/cancel-button/cancel-button.component';
import { Router } from '@angular/router';
import { DeleteButtonComponent } from '../../shared/delete-button/delete-button.component';
import { InputUrlImageFormComponent } from '../../shared/input-url-image-form/input-url-image-form.component';
import { NavigationPathService } from '../../navigation-path/navigation-path.service';
import { DESCRIPTION_RESTRICTION, descriptionRestrictionMessage, NAME_RESTRICTION, nameRestrictionMessage, onlyNumbersRestrictionMessage, REGEX } from '../../constants';
import { FormDirective } from '../../directives/focus-invalid-input.directive';
import { environment } from '../../../environments/environment.localdata';
import { HttpClient } from '@angular/common/http';
import { ProductLocalService } from '../product-service/product-local.service';
import { ProductService } from '../product-service/product.service';
import { ApiProductService } from '../product-service/productInterface';
import { LocaldataserviceService } from '../../localdataservice.service';
import { DisplayNotFoundComponent } from '../../shared/display-not-found/display-not-found.component';
import { SpinnerComponent } from '../../svg/spinner/spinner.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberFormComponent, FormDirective,
    InputStringFormComponent, InputSwitchFormComponent, ValidateButtonComponent, CancelButtonComponent, DeleteButtonComponent, InputUrlImageFormComponent, DisplayNotFoundComponent, SpinnerComponent],
  templateUrl: './product-form.component.html',
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
export class ProductFormComponent {

  @Input('id') storeId: string | undefined = undefined;
  @Input() productId: string | undefined = undefined;
  formCorrect?: boolean = false;
  isLoading: boolean = true;
  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private router: Router, @Inject('ApiProductService') private productService: ApiProductService, private navigationPathService: NavigationPathService) { }

  loadProduct(idProduct: number, idStore: number): void {
    if (!isNaN(idProduct) && !isNaN(idStore)) {
      this.productService.getProductAndStoreById(idStore, idProduct)
        .subscribe({
          next: (response: ProductWithStore) => {
            this.navigationPathService.setInProducts(true);
            this.navigationPathService.setInStores(true);
            this.navigationPathService.setStoreName(response.store.name);
            this.navigationPathService.setProductName(response.product.name);
            this.navigationPathService.setProductId(response.product.id);
            this.navigationPathService.setStoreId(response.store.id);
            this.form.patchValue({
              name: response.product.name,
              description: response.product.description,
              price: response.product.price + '',
              inventoryStatus: response.product.inventoryStatus,
              category: response.product.category,
              currency: response.product.currency,
              imageUrl: response.product.imageUrl,
            })
            this.formCorrect = true;
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
            this.formCorrect = false;
          },
        });
    }
  }

  updateProduct(idProduct: number, product: ProductDTO): void {
    if (!isNaN(idProduct)) {
      this.productService.updateProduct(idProduct, product)
        .subscribe({
          next: (response: ProductDTO) => {
            this.router.navigate([`/stores/${product.storeId}/products`]);

          },
          error: (error) => {
            console.error('Error when updating the products:', error)
          },
        });
    }
  }

  createProduct(product: ProductDTO, idStore: number): void {
    let productToSent = { ...product };
    this.productService.createProduct(productToSent)
      .subscribe({
        next: (response: ProductDTO) => {
          this.router.navigate([`/stores/${idStore}/products`]);
        },
        error: (error) => {
          console.error('Error when creating a product:', error)
        },
      });
  }

  deleteProduct(productId: number, idStore: number): void {
    this.productService.deleteProduct(productId)
      .subscribe({
        next: (response: ProductDTO) => {
          this.router.navigate([`/stores/${idStore}/products`]);
        },
        error: (error) => {
          console.error('Error when creating a product:', error)
        },
      });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.title = this.productId !== undefined ? "Edit the product" : "Create a new product";
    console.log("LALA")

    if (this.productId && this.storeId){
      console.log("LELE")

      this.loadProduct(+this.productId, +this.storeId);
    }
    else{
      this.isLoading = false;
      this.formCorrect = true;
    }
    console.log("lili")
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      let idProduct: number = +(this.productId ?? NaN);
      let idStore: number = +(this.storeId ?? NaN);
      let product: ProductDTO = {
        storeId: idStore, id: idProduct, name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        price: +this.form.controls.price.value.replace(',', '.'),
        inventoryStatus: this.form.controls.inventoryStatus.value,
        category: this.form.controls.category.value,
        currency: this.form.controls.currency.value,
        imageUrl: this.form.controls.imageUrl.value,
      };

      if (!isNaN(idProduct)) {
        this.updateProduct(idProduct, product);
      }
      else {
        this.createProduct(product, idStore);
      }
    }
  }

  private readonly formBuilder = inject(FormBuilder);

  title: string = '';

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(NAME_RESTRICTION)]],
    description: ['', [Validators.required, Validators.maxLength(DESCRIPTION_RESTRICTION)]],
    price: ['0', [Validators.required, Validators.pattern(REGEX.NUMBERS_DOTS_COMMAS)]],
    imageUrl: [''],
    inventoryStatus: [arrayInventoryStatusType[0], [Validators.required, Validators.pattern(new RegExp(`^(${arrayInventoryStatusType.join('|')})$`))]],
    category: [arrayCategoryType[0], [Validators.required, Validators.pattern(new RegExp(`^(${arrayCategoryType.join('|')})$`))]],
    currency: [arrayCurrencyType[0], [Validators.required, Validators.pattern(new RegExp(`^(${arrayCurrencyType.map((value) =>
      value.replace(/[.*+?^${}()|[\]\\]/, "\\$&")).join('|')})$`))]],
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

  descriptionInputProps: InputTextFormProps = {
    title: 'Description',
    formControl: this.form.controls.description,
    required: true,
    numberOfLines: 4,
    helpText: descriptionRestrictionMessage
  };

  priceInputProps: InputFormProps = {
    title: 'Price',
    formControl: this.form.controls.price,
    required: true,
    helpText: onlyNumbersRestrictionMessage

  };

  currencyInputProps: InputSwitchFormProps = {
    title: 'Currency',
    formControl: this.form.controls.currency,
    required: false,
    options: arrayCurrencyType,
    styleOverride: 'text-center h-[2.875rem] min-w-[50px]',
  };

  categoryInputProps: InputSwitchFormProps = {
    title: 'Category',
    formControl: this.form.controls.category,
    required: false,
    options: arrayCategoryType,
  };

  inventoryStatusInputProps: InputSwitchFormProps = {
    title: 'Inventory status',
    formControl: this.form.controls.inventoryStatus,
    required: false,
    options: arrayInventoryStatusType,
  };

  validateButton: ButtonProps = {
    functionToDo: () => { },
    title: 'Submit'
  };

  cancelButton: ButtonProps = {
    functionToDo: () => {
      if (this.storeId)
        this.router.navigate([`/stores/${this.storeId}/products`]);
    },
    title: 'Cancel'
  };

  deleteButton: ButtonProps = {
    functionToDo: () => {
      if (this.productId !== undefined && this.storeId !== undefined)
        this.deleteProduct(+this.productId, +this.storeId)
    },
    title: 'Delete Product'
  };


}
