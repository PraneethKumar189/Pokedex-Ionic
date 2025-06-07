import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {map } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
   private apiurl= 'https://pokeapi.co/api/v2'
  constructor(private http:HttpClient) { }

  getPokemonList(offset:number=0,limit:number=20):Observable<any[]>{
    return this.http.get(`${this.apiurl}/pokemon?offset=${offset}&limit=${limit}`).pipe(map((res:any)=> res.results))

  }

  getPokemonDetails(name:string):Observable<any>{
    return this.http.get(`${this.apiurl}/pokemon/${name}`);
  }
}
