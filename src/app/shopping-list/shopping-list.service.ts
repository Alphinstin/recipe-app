import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { element } from 'protractor';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  itemSelected = new Subject<number>();

  private ingredients = [
    new Ingredient('apples', 10),
    new Ingredient('Tomatoes', 15),
  ];

  getIngredients() {
    return this.ingredients.slice(); // To return a copy to avoid sending the actual object
  }

  onIngredientAdded(ingredientObj: Ingredient) {
    //Check if its exists
    const hasItem = this.ingredients.find(
      (el) => el.name === ingredientObj.name
    );

    if (hasItem === undefined) {
      this.ingredients.push(ingredientObj);
    } else {
      const position = this.ingredients.indexOf(hasItem);
      this.ingredients[position].amount *= 1;
      this.ingredients[position].amount += ingredientObj.amount * 1;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  selectItem(itemId: number) {
    this.itemSelected.next(itemId);
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    const currentIndex = this.ingredients.findIndex(
      (el) => el.name === newIngredient.name
    );
    console.log(currentIndex, index);
    if (currentIndex !== -1) {
      if (currentIndex === index) {
        this.ingredients[index] = newIngredient;
      } else {
        this.ingredients[currentIndex] = newIngredient;
      }
    } else {
      this.ingredients.push(newIngredient);
    }

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
