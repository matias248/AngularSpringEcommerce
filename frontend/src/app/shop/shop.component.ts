import { Component, Inject, inject } from '@angular/core';
import { ProductDTO, ProductListDTO } from '../dto/ProductDTO';
import { StoreDTO } from '../dto/StoreDTO';
import { ShopHeaderComponent } from './shop-header/shop-header.component';
import { environment } from '../../environments/environment.localdata';
import { StoreLocalService } from '../store/store-service/store-local.service';
import { StoreService } from '../store/store-service/store.service';
import { HttpClient } from '@angular/common/http';
import { LocaldataserviceService } from '../localdataservice.service';
import { ApiStoreService } from '../store/store-service/storeInterface';
import { ProductService } from '../product/product-service/product.service';
import { ProductLocalService } from '../product/product-service/product-local.service';
import { ApiProductService } from '../product/product-service/productInterface';
import { ShopSelectorInputComponent } from './shop-selector-input/shop-selector-input.component';
import { ShopCategoryListComponent } from './shop-category-list/shop-category-list.component';
import { ShopProductListComponent } from './shop-product-list/shop-product-list.component';
import { CartItemDTO } from '../dto/CartItem';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { OrderConfirmModalComponent } from './order-confirm-modal/order-confirm-modal.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopHeaderComponent, ShopSelectorInputComponent, ShopCategoryListComponent, ShopProductListComponent, ShopCartComponent, OrderConfirmModalComponent],
  templateUrl: './shop.component.html',
  providers: [
    {
      provide: 'StoreService',
      useFactory: () => {
        if (environment.environmentName === 'localdata') {
          return new StoreLocalService(inject(LocaldataserviceService));
        } else {
          return new StoreService(inject(HttpClient));
        }
      }
    },
    {
      provide: 'ProductService',
      useFactory: () => {
        if (environment.environmentName === 'localdata') {
          return new ProductLocalService(inject(LocaldataserviceService));
        } else {
          return new ProductService(inject(HttpClient));
        }
      }
    }
  ],
})
export class ShopComponent {
  products?: ProductDTO[];
  cartShopList?: CartItemDTO[] = undefined;
  cartListVisible: boolean = false;
  orderConfirmModal: boolean = false;
  listCategoryFilter: string[] = [];
  //const numberOfElementsInCartShop:number = getTotalProductsElements(cartShopList ?? []);
  isLoading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  shopSelected?: StoreDTO;
  listOfStores?: StoreDTO[];
  shopTextFilter = "";
  productTextFilter = "";

  constructor(@Inject('StoreService') private storeService: ApiStoreService, @Inject('ProductService') private productService: ApiProductService) { }

  loadStores(): void {
    this.storeService.getStores()
      .subscribe({
        next: (response: StoreDTO[]) => {
          this.listOfStores = (response);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }
  loadProducts(): void {
    this.productService.getProductsPublic(this.listCategoryFilter, this.currentPage, 10, this.productTextFilter, this.shopSelected?.id)
      .subscribe({
        next: (response: ProductListDTO) => {
          this.products = (response.products);
          this.totalPages = (response.totalPages);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }

  ngOnInit(): void {
    this.loadStores();
    this.loadProducts();
  }

  onSubmitSearchBarStoresFunction = (text: string) => {
    this.shopTextFilter = text;
    this.loadStores();
  }

  changeQuantityInCartShop = (object: { cartItem: CartItemDTO, quantity: number }) => {
    let indexOfShopItemInTheArray: number = -1;
    let { cartItem, quantity } = object;
    if (quantity === 0) {
      this.cartShopList = this.cartShopList?.filter((element) => {
        return element.id !== cartItem.id;
      })
    }
    else {
      this.cartShopList?.forEach((element, index) => {
        if (element.id === cartItem.id) {
          indexOfShopItemInTheArray = index;
        }
      });
      if (indexOfShopItemInTheArray === -1 || this.cartShopList === undefined) {
        let newCartItem: CartItemDTO = cartItem;
        newCartItem.quantity = quantity;
        if (this.cartShopList) {
          this.cartShopList = [newCartItem, ...this.cartShopList]
        }
        else {
          this.cartShopList = [newCartItem]
        }
      }
      else {
        let newCartShopList = [...this.cartShopList];
        newCartShopList[indexOfShopItemInTheArray].quantity = quantity;
        this.cartShopList = newCartShopList;
      }
    }
  }

  changePageFunction = (newValue: number) => {
    this.currentPage = newValue;
    this.loadProducts();
  }

  changeCategoriesFilters = (newArray: string[]) => {
    this.listCategoryFilter = newArray;
    this.loadProducts();
  }

  changeProductTextFilter = (text: string) => {
    this.productTextFilter = text;
    this.loadProducts();
  }

  changeSelectedStore = (store: StoreDTO) => {
    this.shopSelected = store;
    this.loadProducts();
  }

  changeTextFilterStores = (text: string) => {
    this.shopTextFilter = text;
    this.storeService.getStoresFilterByText(this.shopTextFilter)
      .subscribe({
        next: (response: StoreDTO[]) => {
          this.listOfStores = (response);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
  }

  changeIsCartVisible = (cartVisible: boolean) => {
    this.cartListVisible = cartVisible;
  }
  changeIsConfirmModalVisible = (orderConfirmModal: boolean) => {
    this.orderConfirmModal = orderConfirmModal;
  }
}
