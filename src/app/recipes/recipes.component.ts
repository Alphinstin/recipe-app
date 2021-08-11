import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from './recipe.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipeObject: Recipe;
  srSub: Subscription;
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}
