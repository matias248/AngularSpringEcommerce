import { Component, Input } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
  selector: 'app-create-item-button',
  standalone: true,
  imports: [],
  templateUrl: './create-item-button.component.html',
})
export class CreateItemButtonComponent {
  
  @Input()
  buttonProps!: ButtonProps;
}
