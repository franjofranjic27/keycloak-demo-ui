import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {LayoutModule} from "./layout/layout.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ButtonModule, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
