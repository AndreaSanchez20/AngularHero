import { Component } from '@angular/core';
import { HEROES } from '../../_shared/mocks/mock-heroes';
import { Hero } from '../../_shared/models/hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent {
  heroes = HEROES;
}
