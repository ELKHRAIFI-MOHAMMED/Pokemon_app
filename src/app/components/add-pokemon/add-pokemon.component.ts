import { Component, OnInit ,signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../models/Pokemon.models';
import { MonsterType } from '../../utils/monster.utils';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css'],
})
export class AddPokemonComponent implements OnInit {
  loading:boolean=false;
  pokemonForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  monsterTypes = Object.values(MonsterType);
  editPokemon: any = null;
  editButton: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,private router: Router
  ) {
    this.pokemonForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      hp: [0, [Validators.required, Validators.min(1), Validators.max(300)]],
      figureCaption: ['', [Validators.min(1), Validators.required]],
      attackName: ['', Validators.required],
      attackStrength: [
        0,
        [Validators.required, Validators.min(1), Validators.max(150)],
      ],
      attackDescription: ['', [Validators.required, Validators.minLength(5)]],
      image: [null, Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loading=true;
    const pokemon = history.state.pokemon;
    if (pokemon) {
      this.editPokemon = pokemon;
      this.previewImage = pokemon.image;
      this.pokemonForm.patchValue({
        name: pokemon.name,
        hp: pokemon.hp,
        figureCaption: pokemon.figureCaption,
        attackName: pokemon.attackName,
        attackStrength: pokemon.attackStrength,
        attackDescription: pokemon.attackDescription,
        type: pokemon.type,
        image:pokemon.image
      });
      this.editButton=true
    } else {
      this.editButton=false;
    }
    this.loading=false
  }

  upDatePokemon(){
    this.loading=true;
    if (this.pokemonForm.valid) {
      const formValue = this.pokemonForm.value;
      const newPokemon = new Pokemon(
        this.editPokemon.id,
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
      this.http
        .put<Pokemon>('https://back.smdvv.ma/public/api/pokemons/'+this.editPokemon.id, newPokemon)
        .subscribe({
          next: (createdPokemon) => {
            this.toastr.success('Pokémon update avec succès !', 'Succès');

            // Reset du formulaire et de l'image après succès
            this.pokemonForm.reset();
            this.previewImage = null;
            this.router.navigate(['/list']);
            this.loading=false
          },
          error: (error) => {
            //this.toastr.success('Pokémon créé avec succès !', 'Succès');
            console.error("Erreur lors de l'ajout du Pokémon:", error);
          },
        });
    }
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
      reader.onload = () => (this.previewImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.loading=true;
    if (this.pokemonForm.valid) {
      const formValue = this.pokemonForm.value;
      const newPokemon = new Pokemon(
        uuidv4().toString(),
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
      this.http
        .post<Pokemon>('https://back.smdvv.ma/public/api/pokemons', newPokemon)
        .subscribe({
          next: (createdPokemon) => {
            this.toastr.success('Pokémon créé avec succès !', 'Succès');

            // Reset du formulaire et de l'image après succès
            this.pokemonForm.reset();
            this.previewImage = null;
            this.loading=false
          },
          error: (error) => {
            //this.toastr.success('Pokémon créé avec succès !', 'Succès');
            console.error("Erreur lors de l'ajout du Pokémon:", error);
          },
        });
    }
  }
}
