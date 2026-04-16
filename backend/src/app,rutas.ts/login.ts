import { LoginComponent } from './pages/login/login.component';

export const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];