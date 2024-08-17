import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDTO } from '../../../dto/StoreDTO';


@Component({
  selector: 'app-button-confirm',
  standalone: true,
  imports: [],
  templateUrl: './button-confirm.component.html'
})
export class ButtonConfirmComponent {
  @Input() title!: string;
  @Input() styleOverride?: string;

  @Output() buttonWasClick = new EventEmitter<void>();

  buttonWasClickEmitter() {
    this.buttonWasClick.emit();
  }
}
