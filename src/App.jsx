import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appWrite/auth"
import { logOut, login } from "./store/authSlice"

function App () {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logOut())
        }
      })
      .finally(() => { setLoading(false) })
  }, [])

  return !loading ?
    <div>hello</div> : <h1>Loading</h1>
}

export default App
