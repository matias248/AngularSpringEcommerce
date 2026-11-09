import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonProps } from '../../utils/utilsFunctions';

@Component({
    selector: 'app-delete-button',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './delete-button.component.html'
})
export class DeleteButtonComponent {

  @Input()
  buttonProps!: ButtonProps;
}
