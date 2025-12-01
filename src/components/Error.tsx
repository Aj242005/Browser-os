import { NavLink } from "react-router"

export const ErrorComponent = () => {
    return (
        <>
            <h1 className='text-6xl absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 font-bold text-white font-georama' >Error 404 Page Not Found</h1>
            <div className='border-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl text-amber-50 bg-gray-800 hover:shadow-2xl hover:shadow-cyan-400  ' >
                <button className='border-4 bg-linear-to-r e from-red-500 via-green-500 to-pink-500 bg-clip-text text-transparent p-4 rounded-2xl text-2xl font-bold active:text-cyan-300 ' > <NavLink to={'/home'} >Redirect to Home</NavLink> </button>
            </div>
        </>
    )
}