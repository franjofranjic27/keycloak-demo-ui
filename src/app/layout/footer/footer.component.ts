import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SecretService} from "./secret.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  @ViewChild('text', {static: true}) text!: ElementRef;

  constructor(private secretService: SecretService) {
  }

  ngOnInit(): void {
    this.secretService.init(this.text);
  }
}
