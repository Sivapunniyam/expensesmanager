import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { DataEntry } from './data-entry/data-entry';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'data-entry',
        component: DataEntry
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
