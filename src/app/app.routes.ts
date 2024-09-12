import { Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import {ListComponent } from './product-display/product-display.component';

export const routes: Routes = [
  { path: '', component: ProductFormComponent },
  { path: 'products', component:  ListComponent},
];
