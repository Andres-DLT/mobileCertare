import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'history', component: SalesHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
