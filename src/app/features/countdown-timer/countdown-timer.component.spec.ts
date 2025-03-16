import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownTimerComponent } from './countdown-timer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CountdownTimerComponent', () => {
  let fixture: ComponentFixture<CountdownTimerComponent>;
  let component: CountdownTimerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownTimerComponent, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownTimerComponent);
    component = fixture.componentInstance;
    spyOn(window, 'setInterval').and.callFake((fn: Function) => {
      fn();
      return 1;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize countdown on init', () => {
    spyOn<any>(component, 'startCountdown').and.callThrough();
    component.ngOnInit();
    expect(component['startCountdown']).toHaveBeenCalled();
  });

  it('should update countdown correctly', () => {
    component.eventDate = new Date(Date.now() + 86400000).toISOString();
    (component as any).updateCountdown();
    expect(component.remainingTime).toContain('1 day');
  });

  it('should show "This event has passed!" if the date is in the past', () => {
    component.eventDate = new Date(Date.now() - 86400000).toISOString();
    (component as any).updateCountdown();
    expect(component.remainingTime).toBe('This event has passed!');
  });
});