import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/header/header.component'
import { PathData } from './utils/utilsFunctions';
import { NavigationPathComponent } from './navigation-path/navigation-path.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,NavigationPathComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
  pathData:PathData = {
    storeName: undefined,
    productName: undefined,
    inStores: false,
    inProducts: false,
    storeId: undefined,
    productId: undefined
  }
}


