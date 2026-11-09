import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';

import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';
import { EditButtonComponent } from '../../shared/edit-button/edit-button.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-store-item',
    imports: [NoImageSetComponent, EditButtonComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './store-item.component.html'
})
export class StoreItemComponent {

  @Input() store?: StoreDTO = undefined;

  constructor() { }
  ngOnInit(): void {
  }

}
