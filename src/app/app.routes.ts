import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Cajero } from './component/cajero/cajero';
import { AbrirCuenta } from './component/abrir-cuenta/abrir-cuenta';

export const routes: Routes = [

    {
        path: '', component: Home
    },
    {
        path: 'cajero/:banco', component: Cajero
    },
    {
        path: 'abrir-cuenta/:banco', component: AbrirCuenta
    }
];