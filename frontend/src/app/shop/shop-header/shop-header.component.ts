import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';
import { ShopIconComponent } from '../../svg/shop-icon/shop-icon.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShopSelectorDialogComponent } from '../shop-selector-dialog/shop-selector-dialog.component';
import { ShopSelectorInputComponent } from '../shop-selector-input/shop-selector-input.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shop-header',
  standalone: true,
  imports: [ShopIconComponent, SearchBarComponent, ShopSelectorDialogComponent, ShopSelectorInputComponent],
  templateUrl: './shop-header.component.html',
  animations: [
    trigger('openClose', [
      state('closed', style({
        opacity: '0'
      })),
      state('open', style({
        opacity: '1',
      })),
      transition('closed <=> open', [animate('1s ease-in-out')])
    ])
  ]
})
export class ShopHeaderComponent {

  @Input() listOfStores?: StoreDTO[];

  @Input() selectedStore?: StoreDTO;

  @Input() textFilterShop: string = "";

  @Input() textFilterProduct: string = "";

  @Input() numberOfElementsInCartShop: number = 0;


  @ViewChild('buttonCart')
  buttonCart!: ElementRef;
  observer?: IntersectionObserver;
  isButtonCartVisible = true;

  ngAfterViewInit() {
    const threshold = 0;
    if (typeof window !== "undefined") {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              this.isButtonCartVisible = false
            }
            else{
              this.isButtonCartVisible = true

            } 
          });
        },
        { threshold }
      );
    }
    this.observer?.observe(this.buttonCart.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }


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
