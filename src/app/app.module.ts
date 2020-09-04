import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';

import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import {authInterceptorProviders} from './helpers/auth.interceptor.ts';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UpdateCollectionComponent } from './components/update-collection/update-collection.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { CreateItemComponent } from './components/create-item/create-item.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'collections', component: CollectionListComponent},
  { path: 'collections/:id', component: CollectionDetailsComponent},
  { path: 'items/:id', component: ItemDetailsComponent},
  { path: 'collections/update/:id', component: UpdateCollectionComponent},
  { path: 'items/update/:id', component: UpdateItemComponent},
  { path: 'items/collections/:id', component: CreateItemComponent},
  { path: 'users/:id', component: HomeComponent},
  { path: 'collections/list/:id', component: ItemListComponent}
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
    UserDetailsComponent,
    UpdateCollectionComponent,
    ItemListComponent,
    UpdateItemComponent,
    CreateItemComponent
  ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'katemalets'}),
        ReactiveFormsModule,
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
