import React from 'react'
import { useEffect } from 'react'
import { currentUser } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'

function Home() {
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

    return (
        <div>Home</div>
    )
}

export default Home