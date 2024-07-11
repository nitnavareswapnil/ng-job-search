import { Component, OnInit } from '@angular/core';
import { JobDescription } from '../../model/jobsList';
import { JobListService } from '../../service/job-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent implements OnInit{

  jobId: number | undefined;
  jobDescription: JobDescription | undefined;
  
  constructor(private jobListService: JobListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.jobId = +params['id'];
        this.getJobDescription(this.jobId);
      })
  }

  getJobDescription(jobId: number) {
    this.jobListService.getJobDescription(jobId).subscribe((res) => {
      this.jobDescription = res;
    }, (error) => {
      alert("Getting Error while fetching Data: " + error.message);
    })
  }

  backToJobsList(): void {
    this.router.navigate(['/jobs']);
  }
}
