import { Component, OnInit } from '@angular/core';
import { Hero } from '../../_shared/models/hero';
import { HeroService } from '../../Services/hero.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-id.component.html',
  styleUrl: './heroes-id.component.css'
})
export class HeroesIdComponent implements OnInit{

    heroes: Hero[] = [];

    constructor(private heroService: HeroService,
       private messageService: MessageService){};

    getHeroes():void{
      this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    }

    ngOnInit():void{
      this.getHeroes();
    }

    // onSelect(hero: Hero): void {
    //   this.selectedHero = hero;
    //   this.messageService.addMessage(`Heroes Component: Selected hero id=${hero.id}`)
    // }

    add(name:string): void{
      name = name.trim();
      if(!name){return;}
      this.heroService.addHero({ name } as Hero)
      .subscribe(hero=> {
        this.heroes.push(hero);
      });
    }
    delete(hero: Hero):void{
      this.heroes = this.heroes.filter( h => h !== hero);
      this.heroService.deleteHero(hero.id).subscribe();
    }
}
