import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
apiKey:"AIzaSyA0eJHnVGp6tOvMrUve7ajU8BU_0xNxn4w",
authDomain:"authentication-b6934.firebaseapp.com"

})

class App extends React.Component{
state = {isSignedIn: false}

uiConfig = {
signInFlow:"popup",
signInOptions:[
firebase.auth.GoogleAuthProvider.PROVIDER_ID
],
callbacks:{
  signInsuccess:() => false
}
}


ComponentDidMount = () => {
firebase.auth().onAuthStateChange(user => {
  this.setState({isSignedIn: !!user})
})
}

render(){
  return(
<div className="App">
{this.state.isSignedIn ? (<div><h1>Signed In!</h1>
<button onClick={()=> firebase.auth().signOut()}> Sign out!</button> </div>)
:
(<StyledFirebaseAuth
uiConfig={this.uiConfig}
firebaseAuth={firebase.auth()}
></StyledFirebaseAuth>)}

</div>

  )
}

}
export default App;
 