import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
  NgZone,
  OnDestroy,
} from '@angular/core'

@Directive({
  selector: '[autoFitText]',
  standalone: true,
})
export class AutoFitTextDirective implements AfterViewInit, OnDestroy {
  private measurementSpan: HTMLElement
  private debounceTimer: any
  private mutationObserver: MutationObserver | null = null

  private readonly inputMinFont = 12
  private readonly inputMaxFont = 28
  private readonly titleMinFont = 10
  private readonly titleMaxFont = 100
  private readonly inputDefaultFont = 16

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
  ) {
    this.measurementSpan = this.renderer.createElement('span')
    this.renderer.setStyle(this.measurementSpan, 'visibility', 'hidden')
    this.renderer.setStyle(this.measurementSpan, 'position', 'absolute')
    this.renderer.setStyle(this.measurementSpan, 'white-space', 'nowrap')
    document.body.appendChild(this.measurementSpan)
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.resizeText()
        const element = this.el.nativeElement as HTMLElement
        if (element.tagName.toLowerCase() !== 'input') {
          this.mutationObserver = new MutationObserver(() => this.resizeText())
          this.mutationObserver.observe(element, {
            childList: true,
            characterData: true,
            subtree: true,
          })
        }
      }, 50)
    })
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeText()
  }

  @HostListener('input')
  onInput(): void {
    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => this.resizeText(), 100)
  }

  @HostListener('blur')
  onBlur(): void {
    this.resizeText()
  }

  private resizeText(): void {
    const element = this.el.nativeElement as HTMLElement
    const tagName = element.tagName.toLowerCase()
    if (tagName === 'input') {
      this.adjustInputTextSize(element as HTMLInputElement)
    } else if (tagName === 'h1') {
      this.adjustTitleTextSize(element)
    }
  }

  private adjustInputTextSize(input: HTMLInputElement): void {
    const computedStyle = window.getComputedStyle(input)
    this.renderer.setStyle(this.measurementSpan, 'font', computedStyle.font)
    const text = input.value || input.placeholder || ''
    if (!text) {
      this.renderer.setStyle(input, 'font-size', `${this.inputDefaultFont}px`)
      input.scrollLeft = 0
      return
    }
    this.measurementSpan.textContent = text
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0
    const availableWidth =
      computedStyle.boxSizing === 'border-box'
        ? input.clientWidth
        : input.clientWidth - paddingLeft - paddingRight
    const optimalFont = this.findOptimalFontSize(
      (fontSize: number) => {
        this.renderer.setStyle(this.measurementSpan, 'font-size', `${fontSize}px`)
        return this.measurementSpan.offsetWidth
      },
      availableWidth,
      this.inputMinFont,
      this.inputMaxFont,
    )
    this.renderer.setStyle(input, 'font-size', `${optimalFont}px`)
    input.scrollLeft = 0
  }

  private adjustTitleTextSize(title: HTMLElement): void {
    const computedStyle = window.getComputedStyle(title)
    this.renderer.setStyle(this.measurementSpan, 'font', computedStyle.font)
    const text = title.textContent || ''
    this.measurementSpan.textContent = text
    const availableWidth = title.clientWidth
    const optimalFont = this.findOptimalFontSize(
      (fontSize: number) => {
        this.renderer.setStyle(this.measurementSpan, 'font-size', `${fontSize}px`)
        return this.measurementSpan.offsetWidth
      },
      availableWidth,
      this.titleMinFont,
      this.titleMaxFont,
    )
    this.renderer.setStyle(title, 'font-size', `${optimalFont}px`)
  }

  private findOptimalFontSize(
    measureFn: (fontSize: number) => number,
    availableWidth: number,
    minFont: number,
    maxFont: number,
  ): number {
    let low = minFont
    let high = maxFont
    let optimal = minFont
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const width = measureFn(mid)
      if (width <= availableWidth) {
        optimal = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    return optimal
  }

  ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }
}
