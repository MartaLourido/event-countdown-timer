import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[autoFitText]',
  standalone: true,
})
export class AutoFitTextDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.resizeText();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeText();
  }

  private resizeText() {
    const element = this.el.nativeElement;
    let fontSize = 60;
    
    element.style.fontSize = `${fontSize}px`;
    while (element.scrollWidth > element.clientWidth && fontSize > 10) {
      fontSize--;
      element.style.fontSize = `${fontSize}px`;
    }
  }
}
