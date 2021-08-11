import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingComponent } from './loading.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent, DropdownDirective, LoadingComponent],
  imports: [CommonModule],
  exports: [CommonModule, AlertComponent, DropdownDirective, LoadingComponent],
})
export class SharedModule {}
