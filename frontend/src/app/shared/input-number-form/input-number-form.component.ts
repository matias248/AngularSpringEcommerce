import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { InputFormProps } from '../../utils/utilsFunctions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-number-form',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './input-number-form.component.html'
})
export class InputNumberFormComponent {

  @Input()
  inputFormProps!:InputFormProps;

}
