import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './components/calender/calender.component';
import { AppComponent } from './app.component';
import { authGuard } from './authguards/auth.guard';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'calendar', component: CalenderComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
