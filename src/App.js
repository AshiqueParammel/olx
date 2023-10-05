import React,{useEffect,useContext,useState} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/postContext'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import {AuthContext, FirebaseContext} from './store/Context'
function App() {

  const {setUser}=useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[])

  const [user, setUsers] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUsers(authUser);
      } else {
        // User is not logged in
        setUsers(null);
      }
    });   return () => {
      
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Post>
      <Router>

      <Route exact path='/'>
        <Home />
        </Route>
        
      <Route path='/signup'>
        <Signup />
        </Route>
        
      <Route path='/login'>
        < Login/>
        </Route>

        <Route path='/create'>
        {(user? < Create/>:< Login/> )}
        </Route>
        <Route path='/view'>
        <View/>
        </Route>
     
      </Router>
      </Post>
    </div>
  );
}

export default App;
