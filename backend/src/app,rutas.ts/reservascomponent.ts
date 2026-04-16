import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';

export const routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];