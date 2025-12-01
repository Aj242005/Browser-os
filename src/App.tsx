import { Dock } from '#components/Dock'
import { Navbar } from '#components/Navbar'
import { Outlet} from 'react-router'


export const App = () => {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
        <Dock />
      </main>
    </>
  )
} 