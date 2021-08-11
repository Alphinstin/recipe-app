import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;

  private igChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  onItemSelected(id: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

  ngOnInit(): void {
    this.ingredientSubscription = this.store
      .select('shoppingList')
      .subscribe((ingredients) => {
        this.ingredients = ingredients.ingredients;
      });

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (Ingredients: Ingredient[]) => (this.ingredients = Ingredients)
    // );
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
}
