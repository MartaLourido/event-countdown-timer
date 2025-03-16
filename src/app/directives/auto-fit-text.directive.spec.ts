import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AutoFitTextDirective } from './auto-fit-text.directive';

@Component({
  template: `<h1 autoFitText>Test Text</h1> <input autoFitText value="Test Input" />`,
})
class TestComponent {}

describe('AutoFitTextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoFitTextDirective],
      declarations: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should resize text on window resize', () => {
    spyOn(window, 'dispatchEvent');
    window.dispatchEvent(new Event('resize'));
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  it('should resize text on input', () => {
    const input = fixture.nativeElement.querySelector('input');
    spyOn(input, 'dispatchEvent');
    input.dispatchEvent(new Event('input'));
    expect(input.dispatchEvent).toHaveBeenCalled();
  });
});