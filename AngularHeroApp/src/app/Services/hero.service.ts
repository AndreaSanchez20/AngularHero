import { Injectable } from '@angular/core';
import { Hero } from '../_shared/models/hero';
import { HEROES } from '../_shared/mocks/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  //angular injects the singleton MessageService into messageService when it creates the HeroService
  constructor(private messageService: MessageService, private http: HttpClient) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string){
    this.messageService.addMessage(`HeroService: ${message }`)
  }

   /** GET heroes from the server */
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  getHeroNo404<Data>(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes => heroes[0]),
      tap(h=> {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id = ${id}`)
      }),
      catchError(this.handleError<Hero>(`getHero od=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
    /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }
  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]>{
    // if not search term, return empty hero array.
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
      this.log(`found heroes matching "${term}"`):
      this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }
}
