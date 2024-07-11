import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobs, JobDescription } from '../model/jobsList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobListService {

  private favJobs : Jobs[] = [];
  private baseUrl = '/jobs';
  private favItem = 'favJobs';

  constructor(private http: HttpClient) {
    this.showFavJobs();
   }

   getFavJobs() : Jobs[] {
    return this.favJobs;
   }

   getAllJobs() : Observable<Jobs[]> {
    return this.http.get<Jobs[]>(`${this.baseUrl}`);
   }

   getJobDescription(job: number){
    return this.http.get<JobDescription>(`${this.baseUrl}/${job}`);
   }

   private showFavJobs(): void {
    const favoriteJobs = localStorage.getItem(this.favItem);
    if(favoriteJobs) {
      this.favJobs = JSON.parse(favoriteJobs);
    }
   }

   public saveFavJobs(): void {
    localStorage.setItem(this.favItem, JSON.stringify(this.favJobs));
   }
}
