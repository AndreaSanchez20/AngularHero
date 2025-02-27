import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesIdComponent } from './Heroes/heroes-id/heroes-id.component';
import { DashboardComponent } from './Heroes/dashboard/dashboard.component';
import { HeroDetailComponent } from './Heroes/hero-detail/hero-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesIdComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
