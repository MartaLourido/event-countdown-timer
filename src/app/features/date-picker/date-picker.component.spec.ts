import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit dateChange event on input', () => {
    spyOn(component.dateChange, 'emit');
    const input = fixture.nativeElement.querySelector('input');
    input.value = '2025-03-21';
    input.dispatchEvent(new Event('input'));

    expect(component.dateChange.emit).toHaveBeenCalledWith('2025-03-21');
  });
});