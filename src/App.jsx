import {createBrowserRouter , Router, RouterProvider} from 'react-router-dom'

import Landing from "./pages/Landing"
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/user/Home'
import AdminLayout from './components/admin/AdminLayout'
import UsersPage from './pages/admin/UsersPage'
import ProfilePage from './pages/admin/ProfilePage'
import CreateQuestion from './pages/admin/CreateQuestion'
import MyQuestion from './pages/admin/MyQuestion'


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
        {
            path:'/home',
            element:<Home />
        }
    ])
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App
