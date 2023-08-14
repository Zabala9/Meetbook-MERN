import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import Feed from './components/MainPage/Feed';
// import profile 
// import posts ?

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  const loggedIn = useSelector(state => !!state.session.user);

  return loaded && (
    <>
      { loggedIn ? <NavBar /> : undefined }
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />

        <ProtectedRoute exact path="/feed" component={Feed} />
      </Switch>
    </>
  );
}

export default App;
