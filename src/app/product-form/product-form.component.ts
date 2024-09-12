import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,RouterOutlet]
})
export class ProductFormComponent {
  product = {
    name: '',
    product: '',
    quantity: 0,
  };

  submittedProducts: any[] = []; // Array to store submitted products

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const apiUrl = 'https://api.restful-api.dev/objects';
    const postData = {
      name: this.product.name,
      data: {
        product: this.product.product,
        Quantity: this.product.quantity
      }
    };

    this.http.post(apiUrl, postData).subscribe((response: any) => {
      console.log('Response from API:', response);

      // Retrieve the existing IDs from localStorage 
      let productIds: string[] = JSON.parse(localStorage.getItem('productIds') || '[]');

      // Add the new product ID to the array
      productIds.push(response.id);
      localStorage.setItem('productIds', JSON.stringify(productIds));

      // Add the submitted product to the submittedProducts array for display
      this.submittedProducts.push({
        name: this.product.name,
        product: this.product.product,
        quantity: this.product.quantity,
   
      });

      // Clear the form after submission
      this.product = {
        name: '',
        product: '',
        quantity: 0,
      };
    });
  }
}
