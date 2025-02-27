import { Component } from '@angular/core';
import { HEROES } from '../../mock-heroes';
import { Hero } from '../../hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent {
  heroes = HEROES;
}
