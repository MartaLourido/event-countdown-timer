import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() formattedDate: string = '';
  @Output() dateChange = new EventEmitter<string>();

  updateDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateChange.emit(input.value);
  }
}
