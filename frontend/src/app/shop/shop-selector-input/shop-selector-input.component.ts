import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';
import { ArrowDownComponent } from '../../svg/arrow-down/arrow-down.component';
import { ShopSelectorDialogComponent } from '../shop-selector-dialog/shop-selector-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shop-selector-input',
  standalone: true,
  imports: [ArrowDownComponent, ShopSelectorDialogComponent],
  templateUrl: './shop-selector-input.component.html',
  
})
export class ShopSelectorInputComponent {

  @Input() listOfStores?: StoreDTO[];

  @Input() selectedStore?: StoreDTO;

  @Input() shopTextFilter!: string;

  @Input() handlerShopTextFilter!: (text: string) => void;

  menuState:string = 'out';

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  isShopDialogOpen: boolean = false;

  setIsShopDialogOpen=(newValue:boolean)=>{
    this.isShopDialogOpen = newValue;
    this.toggleMenu();
  }
  
  clickOnComponent(event:Event){
    if(!this.isShopDialogOpen){
      event.stopPropagation();
      this.setIsShopDialogOpen(true)
    }
  }

  @Output() confirmButtonEvent = new EventEmitter<StoreDTO>();
  confirmButtonFunction=(store:StoreDTO)=>{
    this.confirmButtonEvent.emit(store);
    this.isShopDialogOpen=false;
  }

  @Output() onSubmitSearchBarStoresEvent = new EventEmitter<string>();
  onSubmitSearchBarStoresFunction=(text:string) =>{
    this.onSubmitSearchBarStoresEvent.emit(text);
  }
}
