import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [
    IonicModule,      
    CommonModule,
    FormsModule
  ]
})
export class PokemonDetailsPage implements OnInit {
  pokemon: any;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data;
      });
    }
  }

  getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      normal: 'medium',
      fire: 'danger',
      water: 'primary',
      electric: 'warning',
      grass: 'success',
      ice: 'tertiary',
      fighting: 'danger',
      poison: 'secondary',
      ground: 'tertiary',
      flying: 'medium',
      psychic: 'secondary',
      bug: 'success',
      rock: 'tertiary',
      ghost: 'dark',
      dragon: 'purple',
      dark: 'dark',
      steel: 'medium',
      fairy: 'pink'
    };
    return typeColors[type] || 'medium';
  }
}
