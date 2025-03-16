import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EventInputComponent } from './features/event-input/event-input.component';
import { DatePickerComponent } from './features/date-picker/date-picker.component';
import { CountdownTimerComponent } from './features/countdown-timer/countdown-timer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'eventTitle') return 'Test Event';
      if (key === 'eventDate') return '2025-03-20T00:00:00.000Z';
      return null;
    });
    spyOn(localStorage, 'setItem');

    await TestBed.configureTestingModule({
      imports: [AppComponent, EventInputComponent, DatePickerComponent, CountdownTimerComponent, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should save and retrieve event title from localStorage', () => {
    component.updateEventTitle('New Event');
    expect(localStorage.setItem).toHaveBeenCalledWith('eventTitle', 'New Event');
    expect(component.eventTitle).toBe('New Event');
  });

  it('should save and retrieve event date from localStorage', () => {
    component.updateEventDate('2025-03-21T00:00:00.000Z');
    expect(localStorage.setItem).toHaveBeenCalledWith('eventDate', '2025-03-21T00:00:00.000Z');
    expect(component.formattedDate).toBe('2025-03-21T00:00:00.000Z');
  });
});