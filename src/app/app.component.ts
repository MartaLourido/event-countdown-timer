import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  eventTitle: string = '';
  formattedDate: string = '';

  ngOnInit(): void {
    this.eventTitle = localStorage.getItem('eventTitle') || '';
    this.formattedDate = localStorage.getItem('eventDate') || '';
  }

  updateEventTitle(newTitle: string) {
    this.eventTitle = newTitle;
    localStorage.setItem('eventTitle', newTitle);
  }

  updateEventDate(newDate: string) {
    this.formattedDate = newDate;
    localStorage.setItem('eventDate', newDate);
  }
}
