import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { PortalModule } from '@angular/cdk/portal';
import { PanelMenuModule } from 'primeng/panelmenu';
import {SidebarComponent} from "./sidebar/sidebar.component";

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    ScrollTopModule,
    NgIf,
    HeaderComponent,
    SideNavigationComponent,
    FooterComponent,
    ScrollTopModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarComponent,
    CommonModule,
    ScrollTopModule,
    ToastModule,
    MenuModule,
    DropdownModule,
    BadgeModule,
    ConfirmDialogModule,
    TooltipModule,
    PortalModule,
    PanelMenuModule,
  ],
  exports: [LayoutComponent],
  bootstrap: [LayoutComponent]
})
export class LayoutModule {}
