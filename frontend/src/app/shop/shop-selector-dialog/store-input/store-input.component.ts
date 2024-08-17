import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDTO } from '../../../dto/StoreDTO';
import { LocationIconComponent } from '../../../svg/location-icon/location-icon.component';

@Component({
  selector: 'app-store-input',
  standalone: true,
  imports: [LocationIconComponent],
  templateUrl: './store-input.component.html',
})
export class StoreInputComponent {

  @Input() store!: StoreDTO;
  @Input() idStoreSelected: number | undefined;

  @Output() elementWasClicked = new EventEmitter<StoreDTO>();

  elementWasClickedFunction() {
    this.elementWasClicked.emit(this.store);
  }
}
