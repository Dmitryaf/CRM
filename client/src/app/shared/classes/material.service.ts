import { ElementRef } from '@angular/core';
declare var M;

export class MaterialService {
  static toast(message: string): void {
    M.toast({ html: message });
  }

  static initFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }
}
