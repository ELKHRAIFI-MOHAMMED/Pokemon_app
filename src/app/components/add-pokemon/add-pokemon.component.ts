import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../models/Pokemon.models';
import { MonsterType } from '../../utils/monster.utils';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient ,HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css']
})
export class AddPokemonComponent {
  pokemonForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  monsterTypes = Object.values(MonsterType);

  constructor(private fb: FormBuilder,private http: HttpClient,private toastr: ToastrService) {
    this.pokemonForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      hp: [0, [Validators.required, Validators.min(1), Validators.max(300)]],
      figureCaption: ['',[Validators.min(1),Validators.required]],
      attackName: ['', Validators.required],
      attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(150)]],
      attackDescription: ['', [Validators.required, Validators.minLength(5)]],
      image: [null, Validators.required],
      type: ['', Validators.required]
    });
  }

  get f() {
    return this.pokemonForm.controls;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.pokemonForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
  if (this.pokemonForm.valid) {
    const formValue = this.pokemonForm.value;
    const newPokemon = new Pokemon(
      formValue.name,
      formValue.hp,
      formValue.figureCaption,
      formValue.attackName,
      formValue.attackStrength,
      formValue.attackDescription,
      this.previewImage as string,
      formValue.type
    );

    // Envoie POST du nouveau Pokémon vers l'API
    this.http.post<Pokemon>('http://localhost:3004/pokemons', newPokemon)
      .subscribe({
        next: (createdPokemon) => {
          this.toastr.success('Pokémon créé avec succès !', 'Succès');

          // Reset du formulaire et de l'image après succès
          this.pokemonForm.reset();
          this.previewImage = null;
        },
        error: (error) => {
          //this.toastr.success('Pokémon créé avec succès !', 'Succès');
          console.error('Erreur lors de l\'ajout du Pokémon:', error);
        }
      });
  }
}



}
