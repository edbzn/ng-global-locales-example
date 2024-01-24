import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScriptLoader {
  private readonly document = inject(DOCUMENT);

  /**
   * Load a script file in the document.
   */
  load(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      this.document.body.appendChild(script);
    });
  }
}
