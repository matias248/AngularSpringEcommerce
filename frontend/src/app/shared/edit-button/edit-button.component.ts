import { Component, Input } from '@angular/core';
import { EditIconComponent } from '../../svg/edit-icon/edit-icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [EditIconComponent,RouterLink],
  templateUrl: './edit-button.component.html',
})
export class EditButtonComponent {
  @Input() id: number | undefined;
  @Input() styleOverride: string = '';
  @Input() urlToGo: string ='';

 
}
