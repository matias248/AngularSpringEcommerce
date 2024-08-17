import { Component, Input } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
  selector: 'app-validate-button',
  standalone: true,
  imports: [],
  templateUrl: './validate-button.component.html',
})
export class ValidateButtonComponent {

  @Input()
  buttonProps!: ButtonProps;
}
