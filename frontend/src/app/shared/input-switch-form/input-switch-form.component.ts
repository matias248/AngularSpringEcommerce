import { Component, Input } from '@angular/core';
import { InputSwitchFormProps } from '../../utils/utilsFunctions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-switch-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-switch-form.component.html',
})
export class InputSwitchFormComponent {

  @Input() inputSwitchFormProps!: InputSwitchFormProps;

}
