import { Component } from '@angular/core';
import { EventInputComponent } from './features/event-input/event-input.component';
import { DatePickerComponent } from './features/date-picker/date-picker.component';
import { CountdownTimerComponent } from './features/countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventInputComponent, DatePickerComponent, CountdownTimerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  eventTitle: string = '';
  formattedDate: string = '';

  updateEventTitle(newTitle: string) {
    this.eventTitle = newTitle;
  }

  updateEventDate(newDate: string) {
    this.formattedDate = newDate;
  }
}
