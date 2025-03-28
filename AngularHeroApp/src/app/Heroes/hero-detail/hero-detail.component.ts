import { Component, Input } from '@angular/core';
import { Hero } from '../../_shared/models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {

  @Input() hero?: Hero

  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location){}

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero=> this.hero =hero);
  }

  getHeroFromServer(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroFromServer(id)
      .subscribe(hero=> this.hero =hero);
  }

  ngOnInit():void{
    this.getHeroFromServer();
  }

  goBack():void{
    this.location.back();
  }
  save():void{
    if(this.hero){
      this.heroService.updateHeroFromServer(this.hero)
      .subscribe(()=>this.goBack());
    }
  }
}
