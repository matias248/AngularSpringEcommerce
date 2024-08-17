import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  @Input('restriction99') restriction99: boolean = false;
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    if (this.restriction99) {
      this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '').substring(0, 2);
    }
    else {
      this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    }

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
