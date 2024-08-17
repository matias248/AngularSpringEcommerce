import { Component, Input } from '@angular/core';
import { InputFormProps } from '../../utils/utilsFunctions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-number-form.component.html'
})
export class InputNumberFormComponent {

  @Input()
  inputFormProps!:InputFormProps;

}
