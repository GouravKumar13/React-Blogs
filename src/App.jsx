import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appWrite/auth';
import { logout, login } from './store/authSlice';
import Layout from './Layout/Layout';

function App () {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  return !loading ? <Layout /> :
    <>
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    </>;
}

export default App;