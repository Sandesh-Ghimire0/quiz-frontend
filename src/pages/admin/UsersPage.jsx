import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUsersInfo } from '../../services/adminService'
import { deleteUser } from '../../services/adminService'

function UsersPage() {
    const queryClient = useQueryClient()

    const fetchUsers = async () => {
        try {
            const res = await getUsersInfo()
            if (res.status === 200) {
                return res.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 60 * 1000
    })

    const deleteMutation = useMutation({
        mutationFn:(id)=>deleteUser(id),
        onSuccess:()=>{
            queryClient.invalidateQueries(['users'])
        }
    })

    if (isPending) return <h2 className="text-xl font-semibold">Loading...</h2>
    if (isError) return <h2 className="text-xl font-semibold text-red-600">Error: {error.message}</h2>

    const admins = data.filter(user => user.role === 'ADMIN')
    const users = data.filter(user => user.role === 'USER')

    const UserTable = ({ title, data, showDelete = false }) => (
        <>
            <h1 className="text-xl font-semibold mt-6 mb-2">{title}</h1>
            <table className="w-full text-left border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Email</th>
                        {showDelete && <th className="p-2 border-b">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            {showDelete && (
                                <td className="p-2">
                                    <button 
                                        onClick={()=>deleteMutation.mutate(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

    return (
        <div className="p-6">
            <UserTable title="Admins" data={admins} />
            <UserTable title="Users" data={users} showDelete />
        </div>
    )
}

export default UsersPage
