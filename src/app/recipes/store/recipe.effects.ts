import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromApp from './../../store/app.reducer';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

const RECIPE_URL =
  'https://ng-course-recipe-book-f0645.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffect {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((fetchRecipeAction: RecipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>(`${RECIPE_URL}`);
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => new RecipeActions.SetRecipes(recipes))
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put(`${RECIPE_URL}`, recipeState.recipes);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
