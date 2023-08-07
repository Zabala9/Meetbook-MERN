import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
// import LoginForm from './components/SessionForms/LoginForm';
// import NavBar from './component/NavBar/NavBar';
import Feed from './components/MainPage/Feed';

function App() {
  // const loggedIn = useSelector(state => !!state.session.user);

  return (
    <>
      {/* { loggedIn ? <NavBar /> : undefined } */}
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}

        <ProtectedRoute exact path="/feed" component={Feed} />
      </Switch>
    </>
  );
}

export default App;
