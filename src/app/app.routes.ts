import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Cajero } from './component/cajero/cajero';

export const routes: Routes = [

    {
        path: '', component: Home
    },
    {
        path: 'cajero/:banco', component: Cajero
    }

];
