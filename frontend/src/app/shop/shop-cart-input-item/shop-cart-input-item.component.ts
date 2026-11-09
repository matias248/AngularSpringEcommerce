import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CartItemDTO } from '../../dto/CartItem';
import { MinusPlusInputComponent } from '../minus-plus-input/minus-plus-input.component';
import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';

@Component({
    selector: 'app-shop-cart-input-item',
    imports: [MinusPlusInputComponent, NoImageSetComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './shop-cart-input-item.component.html'
})
export class ShopCartInputItemComponent {

  @Input() cartItem?:CartItemDTO;
  @Output() quantityChangeEvent = new EventEmitter<{ cartItem: CartItemDTO, quantity: number }>();
  quantityChangeFunction = (newValue: number) => {
    if (this.cartItem)
      this.quantityChangeEvent.emit({ cartItem: this.cartItem, quantity: newValue });
  }
  
}
