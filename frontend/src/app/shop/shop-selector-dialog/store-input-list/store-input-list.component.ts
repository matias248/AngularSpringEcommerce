import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDTO } from '../../../dto/StoreDTO';
import { StoreInputComponent } from '../store-input/store-input.component';

@Component({
  selector: 'app-store-input-list',
  standalone: true,
  imports: [StoreInputComponent],
  templateUrl: './store-input-list.component.html'
})
export class StoreInputListComponent {
  @Input() listOfStores: StoreDTO[] | undefined;
  @Input() temporalStore: StoreDTO | undefined;

  @Output() elementWasClicked = new EventEmitter<StoreDTO>();

  elementWasClickedFunction(storeDTO: StoreDTO) {
    this.elementWasClicked.emit(storeDTO);
  }
 
}
