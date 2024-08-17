import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDTO } from '../../dto/ProductDTO';
import { SpinnerComponent } from '../../svg/spinner/spinner.component';
import { ShopProductImageGalleryComponent } from '../shop-product-image-gallery/shop-product-image-gallery.component';
import { CartItemDTO } from '../../dto/CartItem';
import { getQuantityOfProductInCartShop } from '../../utils/utilsFunctions';
import { NavigationPageInputsComponent } from '../navigation-page-inputs/navigation-page-inputs.component';

@Component({
  selector: 'app-shop-product-list',
  standalone: true,
  imports: [SpinnerComponent, ShopProductImageGalleryComponent, NavigationPageInputsComponent],
  templateUrl: './shop-product-list.component.html'
})
export class ShopProductListComponent {

  @Input() products?: ProductDTO[];

  @Input() isLoading: boolean = true;

  @Input() currentPage: number = 1;

  @Input() totalPages?: number;

  @Input() cartShopList?: CartItemDTO[];

  @Output() quantityChangeEvent = new EventEmitter<{ cartItem: CartItemDTO, quantity: number }>();
  quantityChangeFunction = (object: { cartItem: CartItemDTO, quantity: number }) => {
    this.quantityChangeEvent.emit(object);
  }

  @Output() changePageEvent = new EventEmitter<number>();
  changePageFunction = (newValue: number) => {
      this.changePageEvent.emit(newValue);
  }

  productDTOtoCartItemDTO(product: ProductDTO): CartItemDTO {
    let quantityInCart: number = this.cartShopList ? getQuantityOfProductInCartShop(this.cartShopList, product.id) : 0;
    let cartItem: CartItemDTO = { quantity: quantityInCart, name: product.name, price: product.price, id: product.id, description: product.description, imageUrl: product.imageUrl, currency: product.currency }
    return cartItem;
  }

  

}
