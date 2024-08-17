import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';
import { ShopIconComponent } from '../../svg/shop-icon/shop-icon.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShopSelectorDialogComponent } from '../shop-selector-dialog/shop-selector-dialog.component';
import { ShopSelectorInputComponent } from '../shop-selector-input/shop-selector-input.component';

@Component({
  selector: 'app-shop-header',
  standalone: true,
  imports: [ShopIconComponent, SearchBarComponent, ShopSelectorDialogComponent, ShopSelectorInputComponent],
  templateUrl: './shop-header.component.html',
})
export class ShopHeaderComponent {

  @Input() listOfStores?: StoreDTO[];

  @Input() selectedStore?: StoreDTO;

  @Input() textFilterShop: string = "";

  @Input() textFilterProduct: string = "";

  @Input() numberOfElementsInCartShop?: number;

  @Output() confirmButtonEvent = new EventEmitter<StoreDTO>();
  confirmButtonFunction = (store: StoreDTO) => {
    this.confirmButtonEvent.emit(store);
  }

  @Output() onSubmitSearchBarProductsEvent = new EventEmitter<string>();
  onSubmitSearchBarProductsFunction = (text: string) => {
    this.onSubmitSearchBarProductsEvent.emit(text);
  }

  @Output() onSubmitSearchBarStoresEvent = new EventEmitter<string>();
  onSubmitSearchBarStoresFunction = (text: string) => {
    this.onSubmitSearchBarStoresEvent.emit(text);
  }

  @Output() onClickCartButtonEvent = new EventEmitter<boolean>();
  onClickCartButtonFunction = (value: boolean) => {
    this.onClickCartButtonEvent.emit(value);
  }
  
}
