import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import NotFound404 from './notfound404.js';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner.js';
import ErrorModal from './shared/components/UIElements/ErrorModal.js';
import { useDispatch, useSelector } from 'react-redux';
import  { ThemeActions } from './redux/reducers/ThemeSlice.js';
// Creates a new app object.
function App() {
  const [token, setToken] = useState(null);
  const[userId,setUserId]=useState(null)

  const store=useSelector(state=>state)
  console.log(store)
   const dispatch=useDispatch()

    useEffect(() => {
      setToken(localStorage.getItem("token"))
      setUserId(localStorage.getItem('user'))
    }, [])

  const login = useCallback((uid,token) => {
    setToken(token);
    localStorage.setItem('user',uid)
    localStorage.setItem("token",`${token}`)
    setUserId(uid)
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null)
    localStorage.clear()
  }, []);

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />}/>
        <Route path="/:userId" element={<UserPlaces/>}/>
       
        <Route path="/places/new" element={ <NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace/>}/>
          
       
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users/>}/>
        <Route path="/:userId" element={<UserPlaces/>}/>
        <Route path="/auth" element={<Auth/>}/>        
      </>
    );
  }




  return (<>
    {store.Theme.spinner && <LoadingSpinner asOverlay/>}
    <ErrorModal error={store.Theme.error} onClear={()=>dispatch(ThemeActions.setError(null))}/>
    <AuthContext.Provider
      value={{ isLoggedIn: !!token,token:token, login: login, logout: logout,userId:userId}}
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
    
    </>
  );
}

export default App;
