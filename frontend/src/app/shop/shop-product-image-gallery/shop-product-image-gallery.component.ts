import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemDTO } from '../../dto/CartItem';
import { CrossIconComponent } from '../../svg/cross-icon/cross-icon.component';
import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';
import { MinusPlusInputComponent } from '../minus-plus-input/minus-plus-input.component';

@Component({
  selector: 'app-shop-product-image-gallery',
  standalone: true,
  imports: [CrossIconComponent, NoImageSetComponent, MinusPlusInputComponent],
  templateUrl: './shop-product-image-gallery.component.html'
})
export class ShopProductImageGalleryComponent {

  @Input() cartItem?: CartItemDTO;

  showDescription: boolean = false;

  @Output() quantityChangeEvent = new EventEmitter<{ cartItem: CartItemDTO, quantity: number }>();
  quantityChangeFunction = (newValue: number) => {
    if (this.cartItem)
      this.quantityChangeEvent.emit({ cartItem: this.cartItem, quantity: newValue });
  }

  setShowDescription = (newValue: boolean) => {
    this.showDescription = newValue;
  }


}
