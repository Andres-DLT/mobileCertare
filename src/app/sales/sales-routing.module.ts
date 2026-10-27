import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesHistoryComponent } from './sales-history/sales-history.component';

const routes: Routes = [
  { path: 'cart', redirectTo: '/products/list', pathMatch: 'full' },
  { path: 'history', component: SalesHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
