import {createBrowserRouter , Router, RouterProvider} from 'react-router-dom'

import Landing from "./pages/Landing"
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/user/Home'


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
            children:[
                {
                    path:'dashboard',
                    element:<Dashboard />
                }
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
