import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { AuctionComponent } from './auction/auction.component';
import { GroupchatComponent } from './groupchat/groupchat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'groupchat', component: GroupchatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
