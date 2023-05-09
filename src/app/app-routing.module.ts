import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [{
  path: "card/:operation",
  component: CardComponent
},{
  path: "card-list",
  component: CardListComponent
}, {
  path: '',
  redirectTo: "card/new",
  pathMatch: 'full'
}, {
  path: "**",
  redirectTo: "card/new"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
