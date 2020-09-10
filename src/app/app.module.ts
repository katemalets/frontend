import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';

import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/security/admin/admin.component';
import {authInterceptorProviders} from './helpers/auth.interceptor.ts';
import { CollectionListComponent } from './components/collections/collection-list/collection-list.component';
import { CollectionDetailsComponent } from './components/collections/collection-details/collection-details.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';
import { UpdateCollectionComponent } from './components/collections/update-collection/update-collection.component';
import { UpdateItemComponent } from './components/items/update-item/update-item.component';
import { CreateItemComponent } from './components/items/create-item/create-item.component';
import { SearchComponent } from './components/search/search.component';
import { SearchItemsComponent } from './components/items/search-items/search-items.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TagItemsComponent } from './components/items/tag-items/tag-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

const routes: Routes = [
  { path: 'home', component: MainPageComponent},
  { path: 'account', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'collections', component: CollectionListComponent},
  { path: 'items', component: SearchItemsComponent},
  { path: 'collections/:id', component: CollectionDetailsComponent},
  { path: 'items/:id', component: ItemDetailsComponent},
  { path: 'tags/:id', component: TagItemsComponent},
  { path: 'collections/update/:id', component: UpdateCollectionComponent},
  { path: 'items/update/:id', component: UpdateItemComponent},
  { path: 'items/collections/:id', component: CreateItemComponent},
  { path: 'users/:id', component: HomeComponent},
  { path: 'items/search/:keyword', component: SearchItemsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    CollectionListComponent,
    CollectionDetailsComponent,
    ItemDetailsComponent,
    UpdateCollectionComponent,
    UpdateItemComponent,
    CreateItemComponent,
    SearchComponent,
    SearchItemsComponent,
    MainPageComponent,
    TagItemsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'katemalets'}),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
