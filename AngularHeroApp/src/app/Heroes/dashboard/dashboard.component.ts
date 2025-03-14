import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../Services/hero.service';
import { Hero } from '../../_shared/models/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(private heroService: HeroService){}

  getHeroes():void{
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1,5));
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
