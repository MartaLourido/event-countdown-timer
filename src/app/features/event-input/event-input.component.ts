import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.scss'],
})
export class EventInputComponent {
  @Input() eventTitle: string = '';
  @Output() titleChange = new EventEmitter<string>();

  onTitleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.titleChange.emit(input.value);
  }
}
