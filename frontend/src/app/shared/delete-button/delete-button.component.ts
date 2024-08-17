import { Component, Input } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-button.component.html',
})
export class DeleteButtonComponent {

  @Input()
  buttonProps!: ButtonProps;
}
