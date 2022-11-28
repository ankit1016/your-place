import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import NotFound404 from './notfound404.js';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useState } from 'react';
// Creates a new app object.
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<Users />}/>
        <Route path="/:userId/places" element={<UserPlaces/>}/>
       
        <Route path="/places/new" element={ <NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace/>}/>
          
       
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users/>}/>
        <Route path="/:userId/places" element={<UserPlaces/>}/>
        <Route path="/auth" element={<Auth/>}/>        
      </>
    );
  }




  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
    <Router>
      <Routes>
        <Route path='/' element={<MainNavigation/>}>
           {/* <Route path='/' element={<Users/>}/> */}
           {routes}
          <Route path='*' element={<NotFound404/>}/>
        </Route>
      </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
