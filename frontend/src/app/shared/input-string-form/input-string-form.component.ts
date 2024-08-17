import { Component, Input } from '@angular/core';
import { InputTextFormProps } from '../../utils/utilsFunctions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-string-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-string-form.component.html',
})
export class InputStringFormComponent {

  @Input()
  inputFormProps!: InputTextFormProps;

}
