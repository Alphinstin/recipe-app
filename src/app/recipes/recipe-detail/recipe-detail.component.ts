import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as RecipeActions from './../store/recipe.actions';
import * as ShoppingListAction from './../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSubscription: Subscription;
  recipeId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => +params.id),
        switchMap((id) => {
          this.recipeId = id;
          return this.store.select('recipe');
        }),
        map((recipeState) =>
          recipeState.recipes.find((recipe, index) => index === this.recipeId)
        )
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
    // this.recipeSubscription = this.route.data.subscribe((data: Data) => {
    //   this.recipe = data.recipes[this.recipeId];
    //   console.log(data.recipe);
    // });
  }

  ngOnDestroy(): void {
    // this.recipeSubscription.unsubscribe();
  }

  addRecipeIngredients() {
    this.store.dispatch(
      new ShoppingListAction.AddIngredients(this.recipe.ingredients)
    );
    return false;
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    if (confirm('Procees to delete Recipe')) {
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeId));
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
