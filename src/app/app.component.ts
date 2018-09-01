
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToasterConfig} from 'angular2-toaster';
import { LoaderService } from './commons/services/loader.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'tm-app',
  template: `<toaster-container [toasterconfig]="config">
  </toaster-container><router-outlet><div *ngIf="showLoader" class="dataLoader"></div></router-outlet>`
})
export class AppComponent implements OnInit {
  public config: ToasterConfig =
  new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 2500,
      animation: 'fade',
      positionClass: ' toast-top-right custom-toast'
  });
  showLoader: boolean;
  constructor(
    public router: Router, private activatedRoute: ActivatedRoute, public titleService: Title, private loaderService: LoaderService ) {
  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
  });
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
      });

  }

}



