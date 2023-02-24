/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound404 from './notfound404.js';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import ErrorModal from './shared/components/UIElements/ErrorModal';
import { ThemeActions } from './redux/reducers/ThemeSlice';
// Creates a new app object.
const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem('user'));
  }, []);

  const login = useCallback((uid, tok) => {
    setToken(tok);
    localStorage.setItem('user', uid);
    localStorage.setItem("token", `${tok}`);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  }, []);

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
      </>
    );
  }

  return (
    <>
      {store.Theme.spinner && <LoadingSpinner asOverlay />}
      <ErrorModal error={store.Theme.error} onClear={() => dispatch(ThemeActions.setError(null))} />
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, login, logout, userId }}
      >
        <Router>
          <Routes>
            <Route path='/' element={<MainNavigation />}>
              {/* <Route path='/' element={<Users/>}/> */}
              {routes}
              <Route path='*' element={<NotFound404 />} />
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>

    </>
  );
};

export default App;
