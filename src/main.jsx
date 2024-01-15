import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AddPost, AllPosts, AuthGurd, EditPost, Home, Post, SignIn, Signup, UserProfile } from './Components/index.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login", element: (

          <AuthGurd authentication={ false }>

            <SignIn />
          </AuthGurd>)
      },

      {
        path: "/signup",
        element:
          (<AuthGurd authentication={ false }>
            <Signup />
          </AuthGurd>)
      },
      {
        path: "/addPost",
        element:
          (<AuthGurd authentication>
            <AddPost />
          </AuthGurd>)

      },
      {
        path: "/allPost",
        element:
          (<AuthGurd authentication>
            <AllPosts />
          </AuthGurd>)
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthGurd authentication>

            <EditPost />
          </AuthGurd>
        ),
      },

      {
        path: "/userProfile",
        element: (
          <AuthGurd authentication>

            <UserProfile />
          </AuthGurd>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },

    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router } />

    </Provider>


  </React.StrictMode>,
)

