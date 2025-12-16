import React from 'react'

function Dashboard() {
  return (
    <>
        <div>
            <h1 className='text-2xl font-semibold'>Users</h1>
            <div className='flex gap-10 mt-5'>
                <div className='bg-blue-200 p-4 rounded-xl flex justify-center gap-6 text-xl font-semibold w-sm'>
                    <span className='text-blue-900'>Total Users:</span>
                    <span className='text-blue-900'>32</span>
                </div>
                <div className='bg-red-200 p-4 rounded-xl flex justify-center gap-6 text-xl font-semibold w-sm'>
                    <span className='text-red-900'>Total Admins:</span>
                    <span className='text-red-900'>5</span>
                </div>
                <div className='bg-yellow-200 p-4 rounded-xl flex justify-center gap-6 text-xl font-semibold w-sm'>
                    <span className='text-yellow-900'>Total Regular Users:</span>
                    <span className='text-yellow-900'>10</span>
                </div>
            </div>
        </div>
        <div>
            <h1 className='text-2xl font-semibold mt-10'>Questions</h1>
            <div className='flex gap-10 mt-5'>
                <div className='bg-green-200 p-4 rounded-xl flex justify-center gap-6 text-xl font-semibold w-sm'>
                    <span className='text-green-900'>Total no. of questions:</span>
                    <span className='text-green-900'>32</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard