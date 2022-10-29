import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription, interval } from 'rxjs';

import { pi } from './pi';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'mempi';
  public nextNumbers: string = ""; 
  public isValid: boolean = true;
  public background: string = pi.repeat(3).split("").reverse().join("");
  public timer: string = "0.0s";
  public previous: string = "0.0s";
  public mistakes: number = 0;
  
  private subscription: Subscription | undefined;

  @ViewChild('input') input: ElementRef | undefined;
  @ViewChild('nextNumbersPanel') nextNumbersPanel: MatExpansionPanel | undefined;

  ngOnInit(): void {
    this.subscription = interval(100)
      .subscribe(x => {
        if (this.input?.nativeElement.value) {
          const count = Number.parseFloat(this.timer.slice(0, this.timer.length-1))+0.1;
          let rounded = (Math.round(count * 100) / 100).toString();
          if (rounded.length == 1) rounded += ".0"
          this.timer = `${rounded}s`;
        }
      })
  }
  onInput(): void {
    this.nextNumbersPanel?.close();
    const value = this.input?.nativeElement.value;

    if (!value) {
      this.previous = this.timer != "0.0s" ? this.timer : "0.0s"
      this.timer = "0.0s";
      this.mistakes = 0;
      return;
    }
    if (this.timer == "0.0s") {
      this.timer = "0.0s"
    }
    
    this.isValid = pi.includes(this.input?.nativeElement.value);
    if (!this.isValid) this.mistakes += 1;
  }
  calculateNextNumbers(): void | string {
    const index = pi.indexOf(this.input?.nativeElement.value);
    if (index < 0) return this.nextNumbers = "Bz";
   
    const length = this.input?.nativeElement.value.length;
    const numbers = pi.slice(index + length, index + length + 6); 
    this.nextNumbers = `${numbers.slice(0, 3)},${numbers.slice(3,6)}`
  }
}

