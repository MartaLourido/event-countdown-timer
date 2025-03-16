import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core'

@Directive({
  selector: '[autoFitText]',
  standalone: true,
})
export class AutoFitTextDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.resizeText()
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeText()
  }

  @HostListener('input')
  onInput() {
    this.resizeText()
  }

  private resizeText() {
    const element = this.el.nativeElement
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize)

    fontSize = 100
    element.style.fontSize = `${fontSize}px`

    while (element.scrollWidth > element.clientWidth) {
      fontSize--
      element.style.fontSize = `${fontSize}px`
    }
  }
}
