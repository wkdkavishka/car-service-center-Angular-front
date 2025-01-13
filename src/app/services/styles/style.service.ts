/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  button(colour: string): string {
    return `relative text-sm py-2 px-3 leading-none border rounded text-${colour} inline-flex my-1 hover:border-transparent hover:text-slate-100 hover:bg-${colour} cursor-pointer`;
  }
}
