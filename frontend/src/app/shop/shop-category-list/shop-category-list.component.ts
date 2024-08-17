import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopCategoryItemComponent } from '../shop-category-item/shop-category-item.component';
import { getInitialCategoryMap } from '../../utils/utilsFunctions';

@Component({
  selector: 'app-shop-category-list',
  standalone: true,
  imports: [ShopCategoryItemComponent],
  templateUrl: './shop-category-list.component.html'
})
export class ShopCategoryListComponent implements OnInit {

  title = "Our Categories";
  filterCategoryEntries: [string, boolean][] = [];
  
  ngOnInit(): void {
    let filterCategoryMap: Map<string, boolean> = getInitialCategoryMap();
    this.filterCategoryEntries = filterCategoryMap ? Array.from(filterCategoryMap.entries()) : [];
  }

  @Output() clickInCategoryItemEvent = new EventEmitter<string[]>();
  clickInCategoryItem = () => {
    let filtersActive: string[] = [];
    this.filterCategoryEntries.forEach((currentValue) => {
      if (currentValue[1])
        filtersActive.push(currentValue[0]);
    });
    this.clickInCategoryItemEvent.emit(filtersActive);
  }

  categoryChangeValue(index: number) {
    if (index < this.filterCategoryEntries.length && index >= 0){
      this.filterCategoryEntries[index][1] = !this.filterCategoryEntries[index][1];
    }
    this.clickInCategoryItem()
  }

}
