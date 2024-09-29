import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ButtonConfirmComponent } from './button-confirm/button-confirm.component';
import { StoreInputListComponent } from './store-input-list/store-input-list.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shop-selector-dialog',
  standalone: true,
  imports: [SearchBarComponent, ButtonConfirmComponent, StoreInputListComponent],
  templateUrl: './shop-selector-dialog.component.html',
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      state('open', style({
        transform: 'translateX(0%)',
      })),
      transition('closed <=> open', [animate('1s ease-in-out')])
    ])
  ]
})
export class ShopSelectorDialogComponent implements OnInit {

  @Input() listOfStores: StoreDTO[] | undefined;
  @Input() selectedStore: StoreDTO | undefined;
  @Input() shopTextFilter: string = "";
  @Input() handlerShopTextFilter!: (text: string) => void;
  @Input() isShopDialogOpen:boolean=false;

  temporalStore: StoreDTO | undefined;
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Output() confirmButtonEvent = new EventEmitter<StoreDTO>();
  @Output() onSubmitSearchBarStoresEvent = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.temporalStore = this.selectedStore;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeDialogEvent.emit();
    }
  }

  closeDialogEventMessage() {
    this.closeDialogEvent.emit();
  }

  setTemporalStore(store: StoreDTO) {
    this.temporalStore = store;
  }

  confirmButtonFunction() {
    if (this.temporalStore) {
      this.confirmButtonEvent.emit(this.temporalStore);
    }
  }

  onSubmitSearchBarStoresFunction(text: string) {
    this.onSubmitSearchBarStoresEvent.emit(text);
  }


}
