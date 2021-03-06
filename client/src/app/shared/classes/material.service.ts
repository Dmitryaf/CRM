import { ElementRef } from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?();
  close?();
  destroy?();
}
export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message });
  }

  static initFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInput() {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }
}
