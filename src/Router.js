import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Authentication/Login';
import HomePage from './HomePage';
import App from './App';

 const Router = () =>{
return (
<BrowserRouter>
<Switch>
<Route path="/" Component={HomePage} />
<Route path="/App" Component={App}/>
</Switch>
</BrowserRouter>

);}

export default Router;
