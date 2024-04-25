import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenubarModule} from "primeng/menubar";
import {map, Observable, Subject} from "rxjs";
import {ConfigurationService} from "../../config/configuration.service";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  private onDestroy$ = new Subject<void>();

  @Output() toggleSideNavigation = new EventEmitter<void>();
  environment!: string;

  userProfile$!: Observable<{ id?: string, firstName?: string, lastName?: string }>;

  constructor(
    // private airlockAuthenticationService: AirlockAuthService,
    // private configurationService: ConfigurationService
  ) {
  }

  ngOnInit(): void {
    // this.environment = this.configurationService.config.production ? '' : `(${this.configurationService.config.stage})`;
    // this.userProfile$ = this.airlockAuthenticationService.authenticatedUser().pipe(
    //   map(({id, firstName, lastName}) => ({id, firstName, lastName}))
    // );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onToggleSideNavigation(): void {
    this.toggleSideNavigation.emit();
  }
}
