import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Output() closeModal = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closeModal.emit();
  }
}
