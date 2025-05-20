import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPokemonsComponent } from './list-pokemons.component';

describe('ListPokemonsComponent', () => {
  let component: ListPokemonsComponent;
  let fixture: ComponentFixture<ListPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPokemonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
