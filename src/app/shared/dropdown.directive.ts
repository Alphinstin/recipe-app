import {
  Directive,
  HostListener,
  ElementRef,
  HostBinding,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click', ['$event']) toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
  }

  constructor(private elRef: ElementRef) {}

  ngOnInit() {}
}
