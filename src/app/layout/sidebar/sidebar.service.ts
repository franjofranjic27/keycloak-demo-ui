import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { SidebarRef } from './sidebar-ref.model';

export const SIDEBAR_DATA = new InjectionToken<{}>('SIDEBAR_DATA');

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private componentPortalSource$ = new BehaviorSubject<ComponentPortal<any> | null>(null);
  componentPortal$ = this.componentPortalSource$.asObservable();

  private isOpenSource$ = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSource$.asObservable();

  private resultSource$ = new Subject<any>();

  constructor(private injector: Injector) {
  }

  openNew(component: ComponentType<any>, data?: any): SidebarRef {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{provide: SIDEBAR_DATA, useValue: data}]
    });
    this.componentPortalSource$.next(new ComponentPortal(component, null, injector));
    this.isOpenSource$.next(true);
    return {result: this.resultSource$.asObservable().pipe(takeUntil(this.componentPortal$.pipe(skip(1))))};
  }

  open(): void {
    this.isOpenSource$.next(true);
  }

  close(): void {
    this.isOpenSource$.next(false);
  }

  toggle(): void {
    this.isOpenSource$.next(!this.isOpenSource$.value);
  }

  closeClear(): void {
    this.componentPortalSource$.next(null);
    this.isOpenSource$.next(false);
  }

  setResult(result: any): void {
    this.resultSource$.next(result);
  }
}
