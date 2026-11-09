import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { InputSwitchFormProps } from '../../utils/utilsFunctions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-switch-form',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './input-switch-form.component.html'
})
export class InputSwitchFormComponent {

  @Input() inputSwitchFormProps!: InputSwitchFormProps;

}
