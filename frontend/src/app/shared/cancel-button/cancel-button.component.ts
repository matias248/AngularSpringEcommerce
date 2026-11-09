import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
    selector: 'app-cancel-button',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './cancel-button.component.html'
})
export class CancelButtonComponent {
  @Input()
  buttonProps!: ButtonProps;
}
