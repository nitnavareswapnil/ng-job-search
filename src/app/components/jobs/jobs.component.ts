import { Component, OnInit } from '@angular/core';
import { Jobs } from '../../model/jobsList';
import { Subscription } from 'rxjs';
import { JobListService } from '../../service/job-list.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit{

  jobsList: Jobs[] = [];
  favItems: boolean[] = [];
  subscription$: Subscription | undefined;
  favJobs: Jobs[] = [];
  activeUrl: string = '';
  showFavorite: boolean = false;

  constructor(private jobListService: JobListService, private route: Router) { }

  ngOnInit(): void {
      this.subscription$ = this.jobListService.getAllJobs().subscribe((res) => {
        this.jobsList = res;
      },
      (error) => {
        alert('Getting Error while fetching jobs: ' + error.message)
      })

      this.activeUrl = this.route.url;
      if(this.activeUrl === '/fav-jobs') {
        this.showFavorite = true;
      } 
      else {
        this.showFavorite = false;
      }

      this.getFavJobs();
  }


  isFavJob(id : number): boolean {
    return this.favJobs.some(job => job.id === id);
  }


  toggleFavJob(idx : number, job: Jobs) {
    this.favItems[idx] = !this.favItems[idx];
    const index = this.favJobs.findIndex((selectedItem) => selectedItem?.id === job?.id);
    if(index === -1) {
      this.favJobs.push(job);
    } 
    else {
      this.favJobs.splice(index, 1);
    }

    this.jobListService.saveFavJobs();
  }


  getFavJobs() {
    this.favJobs = this.jobListService.getFavJobs();
  }
  

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

}
