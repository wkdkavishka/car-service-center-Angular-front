import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  darkMenuIsOpen = false;

  DarkMode(isDarkMode: boolean): void {
    const html = document.documentElement; // Target the <html> element
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    this.darkMenuIsOpen = false;
  }

  darkToggle() {
    this.darkMenuIsOpen = !this.darkMenuIsOpen;
  }
}
