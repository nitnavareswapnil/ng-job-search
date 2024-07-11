import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-job-search';
  activeUrl: string = '';

  constructor(private router: Router){ }

  jobsList(): void {
    this.router.navigate(['/jobs']);
  }

  favJobsList(): void {
    this.router.navigate(['/fav-jobs']);
  }


  
}
