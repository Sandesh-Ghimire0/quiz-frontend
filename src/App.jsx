import {createBrowserRouter , Router, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


import Landing from "./pages/Landing"
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/user/Home'
import AdminLayout from './components/admin/AdminLayout'
import UsersPage from './pages/admin/UsersPage'
import ProfilePage from './pages/admin/ProfilePage'
import CreateQuestion from './pages/admin/CreateQuestion'
import MyQuestion from './pages/admin/MyQuestion'
import Signup from './pages/Signup'


function App() {
    const router = createBrowserRouter([
        {
            path:'/',
            element:<Landing />
        },
        {
            path:'/login',
            element:<Login />
        },
        {
            path:'/signup',
            element:<Signup />
        },
        // <---------------------------------- admin routes ----------------------------------------->
        {
            path:'/admin',
            element:<AdminLayout />,
            children:[
                {
                    path:'dashboard',
                    element:<Dashboard />
                },
                {
                    path:'questions',
                    children:[
                        {
                            path:'my',
                            element:<MyQuestion />
                        },
                        {
                            path:'create',
                            element:<CreateQuestion />
                        }
                    ]
                },
                {
                    path:'users',
                    element:<UsersPage />
                },
                {
                    path:'profile',
                    element:<ProfilePage />
                },
            ]
        },
        // <--------------------------------- user routes ------------------------------------------------>
        {
            path:'/home',
            element:<Home />
        }
    ])

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    )
}

export default App
