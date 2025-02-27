import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesIdComponent } from './heroes-id/heroes-id.component';
import { FormsModule } from '@angular/forms';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  declarations: [HeroesIdComponent, HeroesListComponent, HeroDetailComponent, DashboardComponent, HeroSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeroesIdComponent,
    HeroesListComponent]
})
export class HeroesModule { }
