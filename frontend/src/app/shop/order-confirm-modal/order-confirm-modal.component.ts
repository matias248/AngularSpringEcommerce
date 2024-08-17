import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-order-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './order-confirm-modal.component.html'
})
export class OrderConfirmModalComponent {

  @ViewChild('containerModal') containerModal!:ElementRef;

  constructor(private elementRef: ElementRef) { }

  @Output() onClickCrossButtonEvent = new EventEmitter<boolean>();
  onClickCrossButtonFunction = (value: boolean) => {
    this.onClickCrossButtonEvent.emit(value);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    const clickedInside = this.containerModal.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.onClickCrossButtonEvent.emit(false);
    }
  }
}
