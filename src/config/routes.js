import { lazy } from "react";
import urls from './urls'

const routes = [
    {
        path: urls.home,
        component: lazy(() => import('../pages/Home')),
    },
    {
        path: urls.notFound,
        component: lazy(() => import('../pages/NotFound')),
    }
]

export default routes