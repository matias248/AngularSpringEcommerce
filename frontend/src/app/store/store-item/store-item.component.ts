import { Component, Input } from '@angular/core';
import { StoreDTO } from '../../dto/StoreDTO';
import { NgIf } from '@angular/common';
import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';
import { EditButtonComponent } from '../../shared/edit-button/edit-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [NgIf, NoImageSetComponent, EditButtonComponent,RouterLink],
  templateUrl: './store-item.component.html',
})
export class StoreItemComponent {

  @Input() store?: StoreDTO = undefined;

  constructor() { }
  ngOnInit(): void {
  }

}
