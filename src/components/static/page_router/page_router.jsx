import { lazy, Suspense } from 'react';
/* import { PageSpinner2 } from '@components/shared/spinners/spinners';
import Footer from '@components/static/footer/footer';
import Header from '@components/static/header/header'; */
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// lazy load pages
const HomePage = lazy(() => import('@pages/home/home'));
const Impressum = lazy(() => import('@pages/impressum/impressum'));

const SharedLayout = () => {
    return <>
        {/* <Header /> */}
        <main>
            <Outlet />
        </main>
        {/* <Footer /> */}
    </>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <SharedLayout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<>LOADING</>}><HomePage /></Suspense>,
            },
            {
                path: "/impressum",
                element: <Suspense fallback={<>LOADING</>}><Impressum /></Suspense>,
            }
        ]
    },
]);

const PageRouter = () => {
    return <RouterProvider router={router} />
};

export default PageRouter;
