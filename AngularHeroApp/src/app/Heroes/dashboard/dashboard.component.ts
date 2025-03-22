import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../Services/hero.service';
import { Hero } from '../../_shared/models/hero';
import { City } from '../../_shared/models/city';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  heroes: Hero[] = [];
  cities: City[] = [];

  constructor(private heroService: HeroService){}

  getHeroes():void{
    this.heroService.getHeroesFromServer()
    .subscribe(heroes => {
      debugger;
      if(heroes.length> 5){
        this.heroes = heroes.slice(1,5)
      }else{
        this.heroes = heroes
      }
    });
  }

  getCities(): void{
    this.heroService.getCitiesFromServer()
    .subscribe(cities => {
      this.cities = cities
    });
  }

  ngOnInit(): void {
    this.getHeroes();
    this.getCities();
  }
}
