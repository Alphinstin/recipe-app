import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Recipe } from '../recipe.model';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as RecipeActions from './../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  isEditingMode: boolean = false;
  editForm: FormGroup;
  tempEdit: FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,

    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditingMode = params['id'] != null;

      this.initForm();
      // console.log(this.editForm);
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let recipeName = null;
    let recipeImagePath = null;
    let recipeDescription = null;
    let recipeIngredients = [];

    if (this.isEditingMode) {
      let recipe;
      this.storeSub = this.store
        .select('recipe')
        .pipe(map((recipeState) => recipeState.recipes))
        .subscribe((recipes) => {
          recipe = recipes.find((recipe, index) => index === this.id);
        });
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipeIngredients = recipe.ingredients.map(
        (el) =>
          new FormGroup({
            name: new FormControl(el.name, [Validators.required]),
            amount: new FormControl(el.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
      );
    }

    this.editForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: new FormArray(recipeIngredients),
    });
  }

  fetchRecipe(id: number) {}

  getIngredients() {
    return <FormArray>this.editForm.get('ingredients');
  }

  // setFormValues(recipe: Recipe) {
  //   this.editForm.setValue({
  //     name: recipe.name,
  //     imagePath: recipe.imagePath,
  //     description: recipe.description,
  //   });
  // }

  onSubmit() {
    const formData = this.editForm.value;
    // console.log(formData);
    // let { name, description, imagePath, ingredients } = formData;
    // ingredients.forEach((el, index) => {
    //   ingredients[index] = new Ingredient(el.name, el.amount);
    // });

    // const recipe = new Recipe(name, description, imagePath, ingredients);

    if (this.isEditingMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({ index: this.id, recipe: formData })
      );
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(formData));
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredients() {
    this.getIngredients().push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onClear() {
    this.editForm.reset();
  }
  removeIngredientControl(id: number) {
    this.getIngredients().removeAt(id);
    // this.getIngredients().updateValueAndValidity();
  }
}
