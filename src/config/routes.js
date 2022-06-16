import { lazy } from "react";
import urls from './urls'

const routes = [
    {
        path: urls.notFound,
        component: lazy(() => import('../pages/NotFound')),
    },
    {
        path: urls.home,
        component: lazy(() => import('../pages/Home')),
    },
    {
        path: urls.signUp,
        component: lazy(() => import('../pages/SignUp')),
    },
    {
        path: urls.LogIn,
        component: lazy(() => import('../pages/LogIn')),
    },
    {
        path: urls.AdminRegistration,
        component: lazy(() => import('../pages/AdminRegistration')),
    }
]

export default routes