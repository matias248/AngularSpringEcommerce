import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemDTO } from '../../dto/CartItem';
import { getTotalPriceCart } from '../../utils/utilsFunctions';
import { CrossIconComponent } from '../../svg/cross-icon/cross-icon.component';
import { ShopCartInputItemComponent } from '../shop-cart-input-item/shop-cart-input-item.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [CrossIconComponent, ShopCartInputItemComponent],
  templateUrl: './shop-cart.component.html',
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      state('open', style({
        transform: 'translateX(0%)',
      })),
      transition('closed <=> open', [animate('1s ease-in-out')])
    ])
  ]
})
export class ShopCartComponent {
  _cart?: CartItemDTO[];
  totalPriceCart = "0";
  
  @Input() cartListVisible: boolean = false;

  @Input() set cart(value: CartItemDTO[] | undefined) {
    this._cart = value;
    this.totalPriceCart = getTotalPriceCart(this._cart ?? []);
  }

  @Output() quantityChangeEvent = new EventEmitter<{ cartItem: CartItemDTO, quantity: number }>();
  quantityChangeFunction = (object: { cartItem: CartItemDTO, quantity: number }) => {
    this.quantityChangeEvent.emit(object);
  }
  @Output() onClickCrossButtonEvent = new EventEmitter<boolean>();
  onClickCrossButtonFunction = (value: boolean) => {
    this.onClickCrossButtonEvent.emit(value);
  }

  @Output() onClickCrossButtonConfirmModalEvent = new EventEmitter<boolean>();
  onClickCrossButtonConfirmModalFunction = (value: boolean) => {
    this.onClickCrossButtonConfirmModalEvent.emit(value);
  }
  onSubmitButton = (event:Event) => {
    event.stopPropagation();
    if (this._cart && this._cart.length > 0) {
      this.onClickCrossButtonConfirmModalFunction(true)
    }
  }

}
