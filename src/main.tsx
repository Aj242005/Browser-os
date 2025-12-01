import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ErrorComponent } from '#components/Error.tsx'
import { Home } from '#components/Home.tsx'
import { MacOSFolder } from '#components/MacOSFolder.tsx'
import { Analytics } from "@vercel/analytics/react"


<Analytics /> // for vercel analytics

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: 'home',
        element: <Home/>,
        children :[
          {
            path : 'finder',
            element : <MacOSFolder />
          },
          {
            path : 'photos'
          },
          {
            path : 'documents'
          }
        ]
      },
      {
        path: 'text-editor',
        element: <></>,
        children: [
          {
            path: 'test',
            element: <h1>' This is just for testing the /text-editor/$"gibbrish" </h1>
          }
        ]
      },
      {
        path : 'browser',
        element : <></>
      },
      {
        path : "diagram",
        element : <></>
      },
      {
        path : "spotifyyy",
        element : <></>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorComponent />
  }
])


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
