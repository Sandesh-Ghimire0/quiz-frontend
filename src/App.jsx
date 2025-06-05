import {createBrowserRouter , Router, RouterProvider} from 'react-router-dom'

import Landing from "./pages/Landing"
import Login from './pages/Login'


function App() {
    const router = createBrowserRouter([
        {
            path:'/',
            element:<Landing />
        },
        {
            path:'/login',
            element:<Login />
        }
    ])
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App
