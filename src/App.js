/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import ErrorModal from './shared/components/UIElements/ErrorModal';
import { ThemeActions } from './redux/reducers/ThemeSlice';

const Users=React.lazy(() => import('./user/pages/Users'));
const NewPlace=React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces=React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace=React.lazy(() => import('./places/pages/UpdatePlace'));
const NotFound404=React.lazy(() => import('./notfound404.js'));
const Auth=React.lazy(() => import('./user/pages/Auth'));
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
      <Suspense fallback={<div className='center'><LoadingSpinner asOverlay /></div>}>
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
      </Suspense>
    </>
  );
};

export default App;
