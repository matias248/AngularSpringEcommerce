import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
   title = "App presentation:"
   IntroPlatform = 'Welcome to ECportfolio, a platform designed to simulate a simple e-commerce.' 
   IntroDiffApp ='ECportfolio integrates two applications:';
   AppFormsName = "AppForms";
   presentationAppForms = "Easily create and manage data with intuitive forms. FormsApp ensures you can build a comprehensive database effortlessly.";
   AppShopName = "AppShop";
   presentationAppShop = "Simulate a shop website. Present products with detailed descriptions and Images, allowing visitors to browse as if they were shopping online.";
   
}
