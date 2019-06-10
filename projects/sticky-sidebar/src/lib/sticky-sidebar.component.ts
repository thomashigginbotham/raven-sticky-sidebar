import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'raven-sticky-sidebar',
  template: `<div #wrapper class="ss-wrapper"><ng-content></ng-content></div>`,
  styleUrls: ['sticky-sidebar.component.css']
})
export class StickySidebarComponent implements OnInit {
  @Input('topOffset')
  customTopOffset: number;

  @ViewChild('wrapper', { static: true })
  wrapperElementRef: ElementRef;

  private _containerElement: HTMLElement;
  private _wrapperElement: HTMLDivElement;
  private _initialTopOffset: number;
  private _scrollTop: number;
  private _scrollDirection: 'up' | 'down'

  constructor(
    private _hostElementRef: ElementRef
  ) {
    this.customTopOffset = 0;
    this._containerElement = document.documentElement;
    this._scrollTop = 0;
    this._scrollDirection = 'down';
  }

  @Input('container')
  set containerSelector(value: string) {
    this._containerElement = document.querySelector(value);

    if (this._wrapperElement) {
      this.reset();
    }
  }

  ngOnInit() {
    this._wrapperElement = <HTMLDivElement>this.wrapperElementRef.nativeElement;

    this.reset();
    this.addScrollListener();
    this.addResizeListener();
  }

  /**
   * Resets sidebar based on current conditions.
   */
  reset() {
    const hostElement = <HTMLDivElement>this._hostElementRef.nativeElement;

    hostElement.style.minHeight = '0';

    this.setSidebarHeight();
    this.initTopOffset();

    this._scrollTop = this._containerElement.scrollTop;
  }

  /**
   * Ensures the minimum height of the sidebar is the same as the container
   * when floats are used.
   */
  setSidebarHeight(height?: number) {
    const hostElement = <HTMLDivElement>this._hostElementRef.nativeElement;

    if (getComputedStyle(hostElement).cssFloat === 'none') {
      return;
    }

    let containerHeight: number;

    if (height) {
      containerHeight = height;
    } else {
      containerHeight = (this._containerElement === document.documentElement) ?
        hostElement.parentElement.offsetHeight :
        this.getContentBoxHeight(this._containerElement);
    }

    hostElement.style.minHeight = containerHeight + 'px';

    if (this._containerElement !== document.documentElement) {
      // Height change may have changed container height
      const newContainerHeight = this.getContentBoxHeight(this._containerElement);

      if (hostElement.offsetHeight < newContainerHeight) {
        this.setSidebarHeight(newContainerHeight);
      }
    }
  }

  /**
   * Initializes the "top" CSS property of the wrapper element.
   */
  initTopOffset() {
    // Measure container and wrapper height
    const containerHeight = this.getContentBoxHeight(this._containerElement, true);
    const wrapperHeight = this._wrapperElement.offsetHeight;

    // Set top offset
    const topOffset = (wrapperHeight - containerHeight) * -1;

    this._initialTopOffset = (topOffset < this.customTopOffset) ?
      topOffset :
      this.customTopOffset;
    this._wrapperElement.style.top = this._initialTopOffset + 'px';
  }

  /**
   * Watches the scroll event and adjusts the "top" CSS property of the wrapper
   * element.
   */
  addScrollListener() {
    const scrollElement = (this._containerElement === document.documentElement) ?
      window :
      this._containerElement;

    scrollElement.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const topOffset = parseInt(this._wrapperElement.style.top);

        const newScrollTop = this._containerElement.scrollTop;
        const scrollDistance = newScrollTop - this._scrollTop;

        this._scrollDirection = (scrollDistance > 0) ? 'down' : 'up';
        this._scrollTop = this._containerElement.scrollTop;

        if (this._scrollDirection === 'down') {
          if (topOffset - scrollDistance <= this._initialTopOffset) {
            this._wrapperElement.style.top = this._initialTopOffset + 'px';
          } else {
            this._wrapperElement.style.top =
              (topOffset - scrollDistance) + 'px';
          }
        } else {
          if (topOffset - scrollDistance >= this.customTopOffset) {
            this._wrapperElement.style.top = this.customTopOffset + 'px';
          } else if (newScrollTop > -this._initialTopOffset) {
            this._wrapperElement.style.top = (topOffset - scrollDistance) + 'px';
          }
        }
      });
    });
  }

  /**
   * Watches the window.resize event and resets sidebar.
   */
  addResizeListener() {
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => this.reset());
    });
  }

  /**
   * Returns the height of an element without padding or borders.
   * @param element The element to use.
   * @param limitToViewport Whether to use the full height or limit the height
   *                        to the height of the viewport.
   */
  getContentBoxHeight(element: HTMLElement, limitToViewport = false): number {
    const styles = getComputedStyle(element);
    const outerHeight = (limitToViewport) ?
      element.clientHeight :
      element.offsetHeight;
    const padding = parseInt(styles.paddingTop) +
      parseInt(styles.paddingBottom);
    const borders = parseInt(styles.borderTopWidth) +
      parseInt(styles.borderBottomWidth);
    const innerHeight = outerHeight - padding - borders;

    return innerHeight;
  }
}
