import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

import { Recipe } from '../recipes/recipe.model';

import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as RecipeActions from './../recipes/store/recipe.actions';

const RECIPE_URL =
  'https://ng-course-recipe-book-f0645.firebaseio.com/recipes.json';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,

    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  // storeRecipes() {
  //   const recipes = this.recipeService.getRecipes();
  //   this.http.put(`${RECIPE_URL}`, recipes).subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  // fetchRecipes() {
  //   return this.http.get<Recipe[]>(`${RECIPE_URL}`).pipe(
  //     map((recipes) => {
  //       return recipes.map((recipe) => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : [],
  //         };
  //       });
  //     }),
  //     tap((recipes) => {
  //       this.store.dispatch(new RecipeActions.SetRecipes(recipes));
  //     })
  //   );
  // }
}
