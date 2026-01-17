import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
//import { OrderComponent } from './components/order/order.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { OrderStateComponent } from './components/order-state/order-state.component'; 
//import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemComponent } from './components/item/item.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ItemPageComponent } from './components/item-page/item-page.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ItemsComponent } from './components/items/items.component';
import { NewClothesComponent } from './components/new-clothes/new-clothes.component';
import { ClothesStockComponent } from './components/clothes-stock/clothes-stock.component';
import { ShoesStockComponent } from './components/shoes-stock/shoes-stock.component';
import { NewShoesComponent } from './components/new-shoes/new-shoes.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
//    { path: 'signup', component: SignupComponent },
    { path: 'order/orders/users/:id', component: UserOrdersComponent }, //user page with orders
    { path: 'order/orders/:id/detail', component: OrderComponent },// order detail
    { path: 'order/orders/admin', component: AdminOrdersComponent },
    { path: 'order/orders/:id/state', component: OrderStateComponent },
//    { path: 'items', component: InventoryComponent },
    { path: 'store/items/:id/page', component: ItemPageComponent},
    { path: 'inventory/items/:id', component: ItemComponent },
//   { path: 'items/page', component: FavItemAggregationComponent },
    { path: 'store/signup', component: SignupComponent },
    { path: 'store/login', component: LoginComponent }, //user login page
    { path: 'store/my_profile', component: MyprofileComponent }, //user profile
    { path: 'store/shoppingcart/page', component: ShoppingcartComponent}, //user shopping cart page
//    { path: 'orders/new/users/:username', component: UserOrdersComponent},
    { path: 'inventory/items', component: ItemsComponent },
    { path: 'inventory/items/clothes/page', component: NewClothesComponent },
    { path: 'inventory/items/:id/clothes/stock', component: ClothesStockComponent },
    { path: 'inventory/items/:id/shoes/stock', component: ShoesStockComponent },
    { path: 'inventory/items/shoes/page', component: NewShoesComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
