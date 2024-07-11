import { Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDescriptionComponent } from './components/job-description/job-description.component';

export const routes: Routes = [
    {
        path: 'jobs', component: JobsComponent
    },
    {
        path: 'jobs/:id', component: JobDescriptionComponent
    },
    {
        path: 'fav-jobs', component: JobsComponent
    },
    {
        path: '**', redirectTo: 'jobs', pathMatch: 'full'
    }
];
