import { Component } from '@angular/core';
import { EventInputComponent } from './features/event-input/event-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Countdown App';
}
