import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { AutoFitTextDirective } from '../../directives/auto-fit-text.directive';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  imports: [AutoFitTextDirective],
})
export class CountdownTimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() eventDate: string = '';
  remainingTime: string = '';
  private interval: number | undefined;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventDate']?.currentValue) {
      this.startCountdown();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private startCountdown(): void {
    if (!this.eventDate) return;
    
    clearInterval(this.interval);
    this.interval = window.setInterval(() => this.updateCountdown(), 1000);
    this.updateCountdown();
  }

  private updateCountdown(): void {
    if (!this.eventDate) {
      this.remainingTime = 'No event date selected';
      return;
    }

    const eventDateObj = new Date(this.eventDate);
    eventDateObj.setHours(23, 59, 59, 999);
    const eventTime = eventDateObj.getTime();
    
    const currentTime = new Date().getTime();
    const difference = eventTime - currentTime;

    if (difference <= 0) {
      this.remainingTime = 'This event has passed!';
      clearInterval(this.interval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const dayString = days > 0 ? `${days} day${days !== 1 ? 's' : ''}, ` : '';
    this.remainingTime = `${dayString}${hours} h, ${minutes} m, ${seconds} s`;
  }
}
