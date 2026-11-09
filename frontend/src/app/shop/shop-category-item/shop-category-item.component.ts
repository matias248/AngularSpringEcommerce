import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CrossIconComponent } from '../../svg/cross-icon/cross-icon.component';
import { VerifIconComponent } from '../../svg/verif-icon/verif-icon.component';

@Component({
    selector: 'app-shop-category-item',
    imports: [CrossIconComponent, VerifIconComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
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
