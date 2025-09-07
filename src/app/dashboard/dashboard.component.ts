import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports:[CommonModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedFile: File | null = null;
  result: string = '';
  confidence: string = '';

  private apiUrl = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.result = 'Analyzing...';
    this.confidence = '';

    this.http.post<any>(`${this.apiUrl}/predict`, formData).subscribe({
      next: (response) => {
        this.result = response.result;
        this.confidence = response.confidence;
      },
      error: (error) => {
        this.result = 'Error';
        this.confidence = 'Failed to get a response from the server.';
        console.error('There was an error!', error);
      }
    });
  }
}