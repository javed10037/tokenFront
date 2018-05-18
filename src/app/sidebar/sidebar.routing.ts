  import { ModuleWithProviders } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { SidebarComponent } from './sidebar.component';
  import { DashboardComponent } from './../dashboard/dashboard.component';
  import { ViewUserComponent } from './../dashboard/UserList/view-user/view-user.component';
  import { MyProfileComponent } from './../dashboard/UserList/my-profile/my-profile.component';
  import { SettingComponent } from './../dashboard/UserList/setting/setting.component';
  import { HelpComponent } from './../dashboard/UserList/help/help.component';
  import { LoginComponent } from '../login/login.component';
   import { InvestIcoComponent } from './../dashboard/UserList/investIco/investIco.component';
  import { childComponent } from './../dashboard/error404/error404.component'; 
  import { AuthGuard } from './../auth-guard.service';
  import { SendtokenComponent } from './../dashboard/UserList/sendtoken/sendtoken.component';
  import { ReferComponent } from './../dashboard/UserList/refer/refer.component';
  import { GenerateIcoComponent } from './../dashboard/UserList/generate-ico/generate-ico.component';
  import { CrowdsaleComponent } from './../dashboard/UserList/crowdsale/crowdsale.component';
import {  InvestComponent } from './../dashboard/UserList/invest/invest.component';
import { MerchandiseComponent } from '../dashboard/UserList/merchandise/merchandise.component';
import { InvesterReferComponent } from './../dashboard/UserList/invester-refer/invester-refer.component';
  const routes: Routes = [


    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children:
    [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: 'view-user/:userId', component: ViewUserComponent ,canActivate:[AuthGuard]},
    { path: 'view-user', component: ViewUserComponent ,canActivate:[AuthGuard]},
    { path: 'my-profile', component: MyProfileComponent,canActivate:[AuthGuard] },
    { path: 'setting', component: SettingComponent ,canActivate:[AuthGuard]},
    { path: 'help', component: HelpComponent,canActivate:[AuthGuard] },
    { path: 'investIco', component: InvestIcoComponent,canActivate:[AuthGuard] },
    { path: 'sendtoken', component: SendtokenComponent,canActivate:[AuthGuard] },
    { path: 'refer', component: ReferComponent,canActivate:[AuthGuard] },
    { path: 'generateIco', component: GenerateIcoComponent,canActivate:[AuthGuard] },
    { path: 'crowdsale', component: CrowdsaleComponent,canActivate:[AuthGuard] },
    { path: 'invest', component: InvestComponent,canActivate:[AuthGuard] },
    { path: 'merchandise', component: MerchandiseComponent,canActivate:[AuthGuard] },
    { path: 'invester-refer', component: InvesterReferComponent,canActivate:[AuthGuard] },
    { path: 'login', component:LoginComponent},   

    { path: '404', component: childComponent },
    { path: '**', component: childComponent},

    ]},
  ];



  export const routing: ModuleWithProviders = RouterModule.forChild(routes);
