import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
    selector: 'app-create-item-button',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './create-item-button.component.html'
})
export class CreateItemButtonComponent {
  
  @Input()
  buttonProps!: ButtonProps;
}
