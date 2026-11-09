import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
    selector: 'app-validate-button',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './validate-button.component.html'
})
export class ValidateButtonComponent {

  @Input()
  buttonProps!: ButtonProps;
}
