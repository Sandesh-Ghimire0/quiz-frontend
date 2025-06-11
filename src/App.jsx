import {createBrowserRouter , Router, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'
import { currentUser } from './services/authService'
import { useEffect } from 'react'


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
import UserLayout from './components/user/UserLayout'
import Profile from './pages/user/Profile'
import Quiz from './pages/user/Quiz'
import Report from './components/user/Report'


function App() {
    // for fetching the current user data if the page is refresh
    const dispatch = useDispatch()
    
    async function fetchUser(){
        const res = await currentUser()

        if(res.status === 200){
            dispatch(login(res.data.data))
        }
    }

     useEffect(()=>{
        fetchUser()
    }, [])

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
            element:<UserLayout />,
            children:[
                {
                    path:'/home',
                    element:<Home />
                },
                {
                    path:'/profile',
                    element:<Profile />
                },
                {
                    path:'/report',
                    element:<Report />
                }
            ]
        },
        {
            path:'/quiz',
            element:<Quiz />
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
