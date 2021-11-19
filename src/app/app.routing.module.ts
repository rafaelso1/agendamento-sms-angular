import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: 'add',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
  },
  { path: '', component: ScheduleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
