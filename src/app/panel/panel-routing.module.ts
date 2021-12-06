import { RedirectIfNotauthGuard } from './../guards/redirect-if-notauth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./articles/articles.module').then((m) => m.ArticlesModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'variants',
    loadChildren: () =>
      import('./variants/variants.module').then((m) => m.VariantsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'investitions',
    loadChildren: () =>
      import('./investitions/investitions.module').then((m) => m.InvestitionsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then((m) => m.DepartmentsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'offices',
    loadChildren: () =>
      import('./offices/offices.module').then((m) => m.OfficesModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contacts/contacts.module').then((m) => m.ContactsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'popups',
    loadChildren: () =>
        import('./popups/popups.module').then((m) => m.PopupsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'widgets',
    loadChildren: () =>
      import('./widgets/widgets.module').then((m) => m.WidgetsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
