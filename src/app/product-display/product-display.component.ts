import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StorageService } from '../storage.service'; // Adjust path as needed

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './product-display.component.html',
  imports: [CommonModule, FormsModule]
})
export class ListComponent implements OnInit {
  apiUrl = 'https://api.restful-api.dev/objects';
  data: any[] = [];

  constructor(private http: HttpClient, private storageService: StorageService) {}

  ngOnInit(): void {
    this.fetchDataFromStoredIds();
  }

  fetchDataFromStoredIds() {
    const storedIds = this.storageService.getItem('productIds');
    console.log('Stored IDs:', storedIds); // Debugging line

    if (storedIds) {
      try {
        const ids = JSON.parse(storedIds);
        console.log('Parsed IDs:', ids); // Debugging line

        if (Array.isArray(ids) && ids.length > 0) {
          const queryParams = ids.map((id: any) => `id=${encodeURIComponent(id)}`).join('&');
          const url = `${this.apiUrl}?${queryParams}`;
          console.log('Constructed URL:', url); // Debugging line

          this.http.get<any[]>(url).subscribe(response => {
            console.log('Data fetched from API:', response);
            this.data = response;
          }, error => {
            console.error('Error fetching data from API:', error);
          });
        }
      } catch (e) {
        console.error('Error parsing JSON from local storage', e);
      }
    } else {
      console.warn('No IDs found in local storage');
    }
  }
}
