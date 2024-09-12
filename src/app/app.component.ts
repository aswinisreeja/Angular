import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from "./product-form/product-form.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListComponent } from "./product-display/product-display.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, ProductFormComponent, RouterModule,ListComponent,CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
    showList = false; // This controls whether to show the ListComponent
  
}