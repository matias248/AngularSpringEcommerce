import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {

  @Input() textHover?: string = "";
  @Input() textFilter: string = "";

  @Output() onSubmitEvent = new EventEmitter<string>()

  @Input() id!: string;

  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm.patchValue(
      {
        searchValue: this.textFilter
      }
    );
  }

  onSearchSubmit(): void {
    this.onSubmitEvent.emit(this.searchForm.controls.searchValue.value);
  }
}
