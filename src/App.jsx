import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appWrite/auth';
import { logout, login } from './store/authSlice';
import Layout from './Layout/Layout';

function App () {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const userData = await authService.getCurrentUser();
    if (userData) {
      dispatch(login(userData));
    } else {
      dispatch(logout());
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();

  }, []);

  return !loading ? <Layout /> : <h1>Loading</h1>;
}

export default App;