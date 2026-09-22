import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PillarComponent } from './pillar/pillar.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'mobile', component: PillarComponent, data: { pillar: 'mobile' } },
  { path: 'web', component: PillarComponent, data: { pillar: 'web' } },
  { path: 'testing', component: PillarComponent, data: { pillar: 'testing' } },
  { path: 'ai', component: PillarComponent, data: { pillar: 'ai' } },
  { path: 'training', component: PillarComponent, data: { pillar: 'training' } },
  { path: 'schedule', component: ScheduleComponent },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
