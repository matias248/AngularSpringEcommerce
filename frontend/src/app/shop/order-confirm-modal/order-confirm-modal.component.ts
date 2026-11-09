import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order-confirm-modal',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './order-confirm-modal.component.html'
})
export class OrderConfirmModalComponent {

  @ViewChild('containerModal') containerModal!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  @Output() onClickCrossButtonEvent = new EventEmitter<boolean>();
  onClickCrossButtonFunction = (value: boolean) => {
    this.onClickCrossButtonEvent.emit(value);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: EventTarget | null): void {
    if (!(targetElement instanceof HTMLElement)) {
      return;
    }

    const clickedInside = this.containerModal.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.onClickCrossButtonEvent.emit(false);
    }
  }
}
