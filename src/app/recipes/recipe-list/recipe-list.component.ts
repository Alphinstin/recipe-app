import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Recipe } from '../recipe.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.recipesSub = this.store
      .select('recipe')
      .pipe(map((recipeState) => recipeState.recipes))
      .subscribe((data: Recipe[]) => {
        this.recipes = data;
      });
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
