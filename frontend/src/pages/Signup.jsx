import React from 'react'

function Signup() {
  return (
    <div className='h-[100vh] w-full flex items-center justify-center'>
      <div className='text-secondary w-[350px] rounded-lg border border-border'>
        <div className='p-5 flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-bold'>Sign Up</h1>
          <p className=' text-gray-400'>Enter your information to create an account</p>
        </div>
        <div className='p-5 pt-0'>
          <form action="">
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="firstName" className='text-sm font-medium'>First Name</label>
                <input type="text" className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' placeholder='Arya' />
              </div>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="lastName" className='text-sm font-medium'>Last Name</label>
                <input type="text" className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' placeholder='Stark' />
              </div>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="email" className='text-sm font-medium'>E-mail</label>
                <input type="text" className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' placeholder='aryastark@winterfell.com' />
              </div>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="password" className='text-sm font-medium'>Password</label>
                <input type="password" className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' />
              </div>
              <button className='text-sm font-medium bg-secondary text-primary h-10 rounded-md hover:bg-hover'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup