import { lazy } from "react";
import urls from './urls'

const routes = [
    {
        path: urls.notFound,
        component: lazy(() => import('../../pages/NotFound')),
        private: false,
        restricted: false,
        admin: false
    },
    {
        path: urls.home,
        component: lazy(() => import('../../pages/Home')),
        private: false,
        restricted: false,
        admin: false
    },
    {
        path: urls.signUp,
        component: lazy(() => import('../../pages/SignUp')),
        private: false,
        restricted: true,
        admin: false
    },
    {
        path: urls.logIn,
        component: lazy(() => import('../../pages/LogIn')),
        private: false,
        restricted: true,
        admin: false
    },
    {
        path: urls.adminRegistration,
        component: lazy(() => import('../../pages/AdminRegistration')),
        private: true,
        restricted: false,
        admin: true
    }
]

export default routes