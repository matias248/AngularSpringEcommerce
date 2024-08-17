import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';

@Component({
  selector: 'app-navigation-page-inputs',
  standalone: true,
  imports: [FormsModule, OnlyNumbersDirective],
  templateUrl: './navigation-page-inputs.component.html'
})
export class NavigationPageInputsComponent {
  @Input() currentPage?: number = 1;

  @Input() totalPages?: number = 1;

  @Output() changePageEvent = new EventEmitter<number>();

  changePageFunction = (newValue: number) => {
    if (this.totalPages && newValue <= this.totalPages && 1 <= newValue) {
      this.changePageEvent.emit(newValue);
    }
  }



}
