import { Component } from '@angular/core';

@Component({
  selector: 'app-event-input',
  standalone: true,
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.scss'],
})
export class EventInputComponent {
  eventName: string = '';

  updateEventName(event: Event) {
    this.eventName = (event.target as HTMLInputElement).value;
  }
}
