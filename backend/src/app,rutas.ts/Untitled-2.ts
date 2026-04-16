import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';

export const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];