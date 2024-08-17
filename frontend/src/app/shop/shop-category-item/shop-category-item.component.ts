import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrossIconComponent } from '../../svg/cross-icon/cross-icon.component';
import { VerifIconComponent } from '../../svg/verif-icon/verif-icon.component';

@Component({
  selector: 'app-shop-category-item',
  standalone: true,
  imports: [CrossIconComponent, VerifIconComponent],
  templateUrl: './shop-category-item.component.html'
})
export class ShopCategoryItemComponent {
  @Input() category?: string;
  @Input() filterOn: boolean = false;
  @Input() id?: number;

  @Output() clickButtonEvent = new EventEmitter<number>();
  clickButtonFunction = (index: number) => {
    this.clickButtonEvent.emit(index);
  }

}
