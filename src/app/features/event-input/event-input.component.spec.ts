import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventInputComponent } from './event-input.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventInputComponent', () => {
  let fixture: ComponentFixture<EventInputComponent>;
  let component: EventInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInputComponent, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit titleChange event when input changes', () => {
    spyOn(component.titleChange, 'emit');
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'New Event';
    input.dispatchEvent(new Event('input'));

    expect(component.titleChange.emit).toHaveBeenCalledWith('New Event');
  });
});