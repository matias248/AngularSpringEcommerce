import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { InputTextFormProps } from '../../utils/utilsFunctions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-string-form',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './input-string-form.component.html'
})
export class InputStringFormComponent {

  @Input()
  inputFormProps!: InputTextFormProps;

}
