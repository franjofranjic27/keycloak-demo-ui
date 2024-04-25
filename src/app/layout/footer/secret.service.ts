import { ElementRef, Inject, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { buffer, debounceTime, filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SecretService {

  private emojis = ['🥳', '😃', '👁️', '👀', '🌈', '🎆', '✨', '🔥', '🕵️', '👨‍💻', '🍺', '🍻', '👩‍💻', '👁‍🗨', '💖', '🎉', '🐯'];
  private circles: Circle[] = [];
  private requestId?: number;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  init(elementRef: ElementRef): void {
    const click$ = fromEvent(elementRef.nativeElement, 'click');
    const debounce$ = click$.pipe(debounceTime(500));

    // Start
    click$.pipe(
      buffer(debounce$),
      filter(c => c.length >= 10)
    ).subscribe(() => {
      if (!this.requestId) {
        this.initAnimation();
      }
    });

    // Stop
    click$.pipe(
      buffer(debounce$),
      filter(c => c.length === 1)
    ).subscribe(() => {
      if (this.requestId) {
        this.removeCircles();
      }
    });

    fromEvent(window, 'resize').pipe(
      debounceTime(300)
    ).subscribe(() => {
      if (!this.requestId) {
        return;
      }
      this.removeCircles();
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    for (let i = 0; i < 15; i++) {
      const frac = window.innerWidth / 4;
      this.addCircle([10, 300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10, -300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 - frac, -300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 + frac, 300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 - frac * 2, -300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 + frac * 2, 300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 - frac * 3, -300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 + frac * 3, 300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 + window.innerWidth, -300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
      this.addCircle([10 + window.innerWidth, 300], this.emojis[Math.floor(Math.random() * this.emojis.length)]);
    }
    this.startAnimation();
  }

  private addCircle(range: number[], emoji: string): void {
    const c = new Circle(
      range[0] + Math.random() * range[1],
      80 + Math.random() * 4,
      emoji,
      {
        x: -0.15 + Math.random() * 0.3,
        y: 1 + Math.random()
      },
      range,
      this.document.body
    );
    this.circles.push(c);
  }

  private removeCircles(): void {
    this.stopAnimation();
    this.circles.forEach(c => c.remove());
    this.circles = [];
  }

  private animate = (): void => {
    this.requestId = undefined;
    this.circles.forEach(c => c.update());
    this.startAnimation();
  };

  private startAnimation = (): void => {
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(this.animate);
    }
  };

  private stopAnimation = (): void => {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  };
}

class Circle {
  x: number;
  y: number;
  v: any;
  range: any;
  element: HTMLElement;
  container: HTMLElement | null;

  constructor(x: number, y: number, emoji: string, v: any, range: number[], container: HTMLElement | null) {
    this.element = document.createElement('span');
    this.x = x;
    this.y = y;
    this.v = v;
    this.range = range;
    this.container = container;
    this.element.style.display = 'block';
    this.element.style.opacity = '0';
    this.element.style.position = 'absolute';
    this.element.style.fontSize = '26px';
    this.element.style.top = '0';
    this.element.style.left = '0';
    this.element.innerHTML = emoji;
    container?.appendChild(this.element);
  }

  update = (): void => {
    if (this.y > window.innerHeight - 100) {
      this.y = 80 + Math.random() * 4;
      this.x = this.range[0] + Math.random() * this.range[1];
    }
    this.y += this.v.y;
    this.x += this.v.x;
    this.element.style.opacity = '1';
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  };

  remove = (): void => {
    this.element.remove();
  };
}
