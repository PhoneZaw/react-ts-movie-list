import { Outlet, useNavigation } from 'react-router-dom'
import '../css/App.css'
import Nav from '../components/Nav'

export default function App() {
  const { state } = useNavigation();
  
  return (
    <>
      <Nav />
      {state === 'loading' ? (
        <div className="w-screen absolute inset-0 h-screen flex flex-col justify-center items-center">
          <p className='text-xl'>Loading...</p>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}
