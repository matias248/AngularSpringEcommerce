import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../dto/ProductDTO';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EditButtonComponent } from '../../shared/edit-button/edit-button.component';
import { NoImageSetComponent } from '../../svg/no-image-set/no-image-set.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgIf, NoImageSetComponent, EditButtonComponent, RouterLink],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {

  @Input() product?: ProductDTO = undefined;

  constructor() { }
  ngOnInit(): void {
  }

}
