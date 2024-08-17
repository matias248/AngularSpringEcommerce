import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';

@Component({
  selector: 'app-minus-plus-input',
  standalone: true,
  imports: [FormsModule, OnlyNumbersDirective],
  templateUrl: './minus-plus-input.component.html'
})
export class MinusPlusInputComponent {
  _initialValue?: number;
    value: number = 0;

  @Input() set initialValue(value: number) {
    this._initialValue = value
    if(this._initialValue != this.value){
      this.value = value;
    }
  }

  @Input() id: string = "";
  @Output() valueChange = new EventEmitter<number>();

  ngOnInit() {
    if (this.initialValue)
      this.value = this.initialValue;
  }

  minusFunction = () => {
    if (this.value !== undefined && this.value >= 1) {
      this.value = this.value - 1;
      this.valueChange.emit(this.value);
    }
  };

  plusFunction = () => {
    if (this.value !== undefined && this.value < 99) {
      this.value = this.value + 1;
      this.valueChange.emit(this.value);
    }
  };

  onChange = (inputValue: string) => {
    const isPositiveInteger = /^[0-9]\d*$/.test(inputValue);
    if (isPositiveInteger) {
      if (+inputValue <= 99) {
        this.value = +inputValue;
        this.valueChange.emit(this.value);
      }
    }
  }



}
