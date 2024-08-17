import { Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './product/product.component';
import { StoreViewComponent } from './store/store-view/store-view.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { StoreFormComponent } from './store/store-form/store-form.component';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'stores', component: StoreComponent },
    { path: 'stores/new', component: StoreFormComponent },
    { path: 'stores/:id', component: StoreViewComponent },
    { path: 'stores/:id/edit', component: StoreFormComponent },

    { path: 'stores/:id/products', component: ProductComponent },
    { path: 'stores/:id/products/new', component: ProductFormComponent },
    { path: 'stores/:id/products/:productId', component: ProductViewComponent },
    { path: 'stores/:id/products/:productId/edit', component: ProductFormComponent },

    { path: 'shop', component: ShopComponent },






];
