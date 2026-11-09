import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { StoreDTO } from '../../../dto/StoreDTO';
import { LocationIconComponent } from '../../../svg/location-icon/location-icon.component';

@Component({
    selector: 'app-store-input',
    imports: [LocationIconComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './store-input.component.html'
})
export class StoreInputComponent {

  @Input() store!: StoreDTO;
  @Input() idStoreSelected: number | undefined;

  @Output() elementWasClicked = new EventEmitter<StoreDTO>();

  elementWasClickedFunction() {
    this.elementWasClicked.emit(this.store);
  }
}
