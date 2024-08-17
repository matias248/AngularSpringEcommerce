import { Component, Input } from '@angular/core';
import { InputFormProps } from '../../utils/utilsFunctions';
import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-url-image-form',
  standalone: true,
  imports: [NoImageSetComponent,ReactiveFormsModule],
  templateUrl: './input-url-image-form.component.html',
})
export class InputUrlImageFormComponent {

  @Input()
  inputFormProps!:InputFormProps;
  
}
