import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import Feed from './components/MainPage/Feed';
import Profile from './components/Profile/Profile';
import Groups from './components/Groups/Groups';
import Market from './components/Market/Market';
import Games from './components/Games/Games';
import SavePosts from './components/SavePosts/SavePosts';
import PostShow from './components/Posts/PostShow';
import ProfileSearched from './components/Search/ProfileSearched';

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
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/groups" component={Groups} />
        <ProtectedRoute exact path="/market" component={Market} />
        <ProtectedRoute exact path="/games" component={Games} />
        <ProtectedRoute exact path="/saved" component={SavePosts} />
        <ProtectedRoute exact path="/post/:postId" component={PostShow} />
        <ProtectedRoute exact path="/profile/:userId" component={ProfileSearched} />
      </Switch>
    </>
  );
}

export default App;
