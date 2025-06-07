import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton ,IonCard} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  animations:[
   trigger('fadeIn',[
    transition(':enter',[
      style({opacity:0,transform:'translate(20px)'}),
      animate('300ms ease-out',style({
        opacity:1,transform:'translateY(0)'
      }))
    ])
   ])
  ],
  imports: [ CommonModule, FormsModule,IonicModule]
})
export class PokemonListPage implements OnInit {
pokemonList:any[]=[];
filteredPokemon:any[]=[];
searchItem:string='';
offset:number=0;

loadMore(event: any) {
   this.offset += 20;
   this.loadPokemon();
   event.target.complete()
}
viewDetails(name:string) {
 this.router.navigate(['/pokemon-details',name])
}

searchPokemon() {
 this.filteredPokemon = this.pokemonList.filter(pokemon =>{
  pokemon.name.includes(this.searchItem.toLowerCase())
 })

}


  constructor(private pokemonser:PokemonService,private router:Router) { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(){
    this.pokemonser.getPokemonList(this.offset).subscribe((data)=>
    {
      this.pokemonList=[...this.pokemonList,...data];
      this.filteredPokemon=this.pokemonList;
    })
  }

}
