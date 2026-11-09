import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { InputFormProps } from '../../utils/utilsFunctions';
import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-url-image-form',
    imports: [NoImageSetComponent, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './input-url-image-form.component.html'
})
export class InputUrlImageFormComponent {

  @Input()
  inputFormProps!:InputFormProps;
  
}
