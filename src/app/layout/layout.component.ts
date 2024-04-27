import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CommonModule, NgIf} from "@angular/common";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {HeaderComponent} from "./header/header.component";
import {CardModule} from "primeng/card";
import {SideNavigationComponent} from "./side-navigation/side-navigation.component";
import {map, Observable} from "rxjs";
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";
import {FooterComponent} from "./footer/footer.component";
import {ScrollTopModule} from "primeng/scrolltop";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SidebarService} from "./sidebar/sidebar.service";
// import {ConfigurationService} from "../config/configuration.service";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {select, Store} from "@ngrx/store";
import {LayoutOptionState} from "../core/state/layout-option/layout-option.reducer";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('navigationCollapse', [
      state('true', style({'overflow': 'hidden', 'margin-left': '-16rem'})),
      state('false', style({'overflow': '*', 'margin-left': '0'})),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('250ms ease-out')),
    ]),
    trigger('sidebarOpen', [
      state('false', style({'margin-right': '-30rem'})),
      state('true', style({'margin-right': '0'})),
      transition('false => true', group([
        query('*', animateChild()),
        animate('250ms ease-out')
      ])),
      transition('true => false', group([
        query('*', animateChild()),
        animate('200ms ease-in')
      ])),
    ])
  ]
})
export class LayoutComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  appName = 'Nemos';
  // appStage = this.configurationService.config.stage;

  isWindowHeightLayout$!: Observable<boolean>;

  isNavigationCollapsed = true;
  isSidebarOpen$ = this.sidebarService.isOpen$;
  contentClass$ = this.store.pipe(
    map(isFullWidthLayout => isFullWidthLayout ? 'content-full' : 'content p-pt-4 p-pb-4 p-pl-4 p-pr-4')
  );


  constructor(private readonly keycloak: KeycloakService,
              private sidebarService: SidebarService,
              private store: Store<LayoutOptionState>
              ) {}

  public async ngOnInit() {
    this.isWindowHeightLayout$ = this.store.pipe(
      select(state => state.isWindowHeightLayout) // Access the property from state
    );
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(this.userProfile);
    }
  }

  toggleSideNavigation(): void {
    this.isNavigationCollapsed = !this.isNavigationCollapsed;
  }

  onClickOverlay(): void {
    this.isNavigationCollapsed = true;
    this.sidebarService.close();
  }
}
