import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestGuard} from "./guards/guest.guard";
import {AuthGuard} from "./guards/auth.guard";
import {BaseComponent} from "./components/base/base.component";
import {AuthComponent} from "./components/auth/auth.component";
import {EncryptComponent} from "./components/encrypt/encrypt.component";
import {DecryptComponent} from "./components/decrypt/decrypt.component";


const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
    },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'encrypt'
            },
            {
                path: 'encrypt',
                component: EncryptComponent,
                data: {
                    title: 'Encrypt'
                }
            },
            {
                path: 'decrypt',
                component: DecryptComponent,
                data: {
                    title: 'Decrypt'
                }
            },
        ]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
