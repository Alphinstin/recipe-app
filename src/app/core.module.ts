import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service ';
import { RecipeResolverService } from './recipes/recipe-resolver.service';

// Used to provide services in order to make the app module leaner
@NgModule({
  providers: [
    ShoppingListService,

    RecipeResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
