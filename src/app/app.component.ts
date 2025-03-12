import { Component } from '@angular/core';
import { EventInputComponent } from './features/event-input/event-input.component';
import { DatePickerComponent } from './features/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventInputComponent, DatePickerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  eventTitle: string = '';

  updateEventTitle(newTitle: string) {
    this.eventTitle = newTitle;
  }
}
