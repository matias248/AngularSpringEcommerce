import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { EditIconComponent } from '../../svg/edit-icon/edit-icon.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-edit-button',
    imports: [EditIconComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './edit-button.component.html'
})
export class EditButtonComponent {
  @Input() id: number | undefined;
  @Input() styleOverride: string = '';
  @Input() urlToGo: string ='';

 
}
