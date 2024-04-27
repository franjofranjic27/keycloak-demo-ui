import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {concatMap, map, Observable, of} from "rxjs";
import {MenuItem} from "primeng/api";
import {CommonModule} from "@angular/common";
import {PanelMenuModule} from "primeng/panelmenu";
import {FormsModule} from "@angular/forms";
import {ThemeState, ThemeType} from "../../core/state/theme/theme.reducer";
import {LanguageState, LanguageType} from "../../core/state/language/language.reducer";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../core/state/language/language.service";
import {select, Store} from "@ngrx/store";
import {selectLanguage} from "../../core/state/language/language.actions";
import {ThemeService} from "../../core/state/theme/theme.service";

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    TranslateModule,
    DropdownModule,
    CommonModule,
    PanelMenuModule,
    FormsModule
  ],
  providers: [
    LanguageService,
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent implements OnInit {
  private readonly MENU_ITEMS = [
    {
      label: 'menu.actionBoard',
      routerLink: '/action-board',
      // allowedRoles: [ROLE_MAPPING.fachlicherSupervisor, ROLE_MAPPING.controlRoom, ROLE_MAPPING.mitarbeiter]
    }
  ];

  theme$!: Observable<ThemeType>;
  private readonly THEMES = [
    {label: 'theme.light', value: ThemeType.LIGHT},
    {label: 'theme.blue', value: ThemeType.BLUE},
    {label: 'theme.dark', value: ThemeType.DARK}
  ];
  language$!: Observable<LanguageType>;
  menuItems$!: Observable<MenuItem[]>;
  languages$!: Observable<{ [key: string]: string }[]>;
  themes$!: Observable<{ [key: string]: string }[]>;

  private readonly LANGUAGES = [
    {label: 'language.de', value: LanguageType.de},
    {label: 'language.fr', value: LanguageType.fr},
    {label: 'language.it', value: LanguageType.it}
  ];

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private languageService: LanguageService,
    // private roleVerifierService: RoleVerifierService
    private languageStore: Store<LanguageState>,
    private themeStore: Store<ThemeState>
  ) {}

  ngOnInit(): void {
    this.theme$ = this.themeStore.select('theme');
    this.language$ = this.languageStore.select('language');
    this.initMenuItems();
    this.initLanguages();
    this.initThemes();
  }
  //
  setLanguage({value}: { originalEvent: Event, value: LanguageType }): void {
    this.languageService.setLanguage(value);
  }

  private initMenuItems(): void {
    this.menuItems$ = this.language$.pipe(
      // switchMap(() => this.roleVerifierService.mappedUserRole$),
      map((roles) => {
        return this.MENU_ITEMS
          // .filter(menuItem => roles.some(userRole => menuItem.allowedRoles.includes(userRole)))
          .map(this.menuItemsMapper) as MenuItem[];
      })
    );
  }

  private menuItemsMapper = (item: MenuItem) => {
    const subMenuTrans = item.items?.map(subMenu => ({
      ...subMenu,
      label: this.translateService.instant(subMenu.label || '')
    }));
    return ({
      ...item,
      label: this.translateService.instant(item.label || ''),
      items: subMenuTrans
    });
  };

  private initLanguages(): void {
    this.languages$ = this.language$.pipe(
      map(() => {
        return this.LANGUAGES.map(item => ({...item, label: this.translateService.instant(item.label)}));
      })
    );
  }

  setTheme({value}: { originalEvent: Event, value: ThemeType }): void {
    this.themeService.setTheme(value);
  }

  private initThemes(): void {
    // Combine store observable with translateService using concatMap
    this.themes$ = this.languageStore.pipe(
      select(selectLanguage), // Get the current language observable
      concatMap(language => {
        // Translate theme labels based on the selected language
        return of(this.THEMES.map(item => ({
          ...item,
          label: this.translateService.instant(item.label, { lang: language })
        })));
      })
    );
  }
}
