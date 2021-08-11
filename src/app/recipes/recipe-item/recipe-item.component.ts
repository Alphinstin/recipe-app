import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('Recipe') recipe: Recipe;
  @Input('id') id: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  // Programmatic Linking
  // recipeSelected() {
  //   this.router.navigate([`${this.id}`], { relativeTo: this.route });
  // }
}
