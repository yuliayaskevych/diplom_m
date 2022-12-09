import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component'
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';
import { LibraryComponent } from './library/library.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsSearchComponent } from './friends/friends-search/friends-search.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { RecommendedComponent } from './recommended/recommended.component';

const friendsRoutes: Routes = [
  { path: 'search', component: FriendsSearchComponent},
  { path: 'list', component: FriendsListComponent}
];

const menuRoutes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'friends', component: FriendsComponent, children: friendsRoutes},
  {path: 'profile', component: ProfileComponent},
  {path: 'recommended', component: RecommendedComponent},
];
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'menu/:uid', component: MenuComponent},
  {path: 'menu/:uid', component: MenuComponent, children: menuRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
