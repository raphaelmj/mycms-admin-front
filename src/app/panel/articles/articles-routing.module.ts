import { ArticlesResolveService } from './../../services/article/articles-resolve.service';
import { ArticlesComponent } from './articles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesResolveService} from '../../services/categories/categories-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    resolve: { articles: ArticlesResolveService, categories: CategoriesResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
