import { EcIconComponent } from '../svg/ec-icon/ec-icon.component';
import { ShopIconComponent } from '../svg/shop-icon/shop-icon.component';
import { FormsIconComponent } from '../svg/forms-icon/forms-icon.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { getCurrentApp } from '../utils/utilsFunctions';
import { AppNames } from '../constants';

@Component({
    selector: 'app-header',
    imports: [EcIconComponent, ShopIconComponent, FormsIconComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  route?: AppNames;
  appNames: typeof AppNames = AppNames;
  
  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      this.route = getCurrentApp(location.path())
    });
  }

  ngOnInit() {
  }

}
