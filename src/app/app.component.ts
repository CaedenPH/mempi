import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { pi } from './pi';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'mempi';
  nextNumbers: string = ""; 
  isValid: boolean = true;
  background: string = pi.split("").reverse().join("");

  @ViewChild('input') input: ElementRef | undefined;
  @ViewChild('nextNumbersPanel') nextNumbersPanel: MatExpansionPanel | undefined;

  onInput(): void {
    this.nextNumbersPanel?.close();

    this.isValid = pi.includes(this.input?.nativeElement.value);
  }

  calculateNextNumbers(): void | string {
    const index = pi.indexOf(this.input?.nativeElement.value);
    if (index < 0) return this.nextNumbers = "Bz";
   
    const length = this.input?.nativeElement.value.length;
    this.nextNumbers = pi.slice(index + length, index + length + 6); 
  }
}

