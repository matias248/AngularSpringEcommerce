import { Component, Input } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
  selector: 'app-cancel-button',
  standalone: true,
  imports: [],
  templateUrl: './cancel-button.component.html'
})
export class CancelButtonComponent {
  @Input()
  buttonProps!: ButtonProps;
}
