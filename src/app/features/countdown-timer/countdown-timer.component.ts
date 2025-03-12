import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() eventDate: string = '';
  remainingTime: string = '';
  private interval: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnChanges(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startCountdown(): void {
    if (this.eventDate) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }
  }

  updateCountdown(): void {
    if (!this.eventDate) {
      this.remainingTime = 'No event date selected';
      return;
    }

    const eventTime = new Date(this.eventDate).getTime();
    const currentTime = new Date().getTime();
    const difference = eventTime - currentTime;

    if (difference <= 0) {
      this.remainingTime = 'Event Started!';
      clearInterval(this.interval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.remainingTime = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}
