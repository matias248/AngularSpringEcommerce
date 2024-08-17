import { Component, Input } from '@angular/core';
import { AppNames } from '../constants';
import { getCurrentApp } from '../utils/utilsFunctions';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { NavigationPathService } from './navigation-path.service';


@Component({
  selector: 'app-navigation-path',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation-path.component.html',
})
export class NavigationPathComponent {
  route?: AppNames;
  appNames: typeof AppNames = AppNames;

  @Input('productId') productId?: string = undefined;
  @Input('id') storeId?: string = undefined;


  constructor(location: Location, router: Router, public navigationPathService: NavigationPathService) {
    router.events.subscribe((val) => {
      this.route = getCurrentApp(location.path());
    });
  }

  ngOnInit() {
  }

}
