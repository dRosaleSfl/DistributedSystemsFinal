import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from '../app/components/perfil/perfil.component';
import { FailedComponent } from './components/failed/failed.component';
import { MimusicComponent } from './mimusic/mimusic.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'artist/:id', component: ArtistaComponent},
  {path: 'failed', component: FailedComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'mimusica', component: MimusicComponent }, 
  {path: 'perfil', component: PerfilComponent },
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '**', pathMatch: 'full', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),
  FormsModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
