import React, { Component } from 'react'
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import { connect } from 'react-redux';

import Navbar from './components/Navigation/Navbar/Navbar'
import Landing from './containers/Landing/Landing'
import Login from './containers/Auth/Login/Login'
import Logout from './containers/Auth/Logout'
import Register from './containers/Auth/Register/Register'
import PostRegister from './containers/Auth/Register/PostRegister'
import Profile from './containers/Profile/Profile'
import PacientForm from './containers/PacientForm/PacientForm'
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    if( userId && !this.props.userId) {
      const token = localStorage.getItem('accessToken')
      this.props.retrieveUserInfo(token, userId)
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/registration-completed" component={PostRegister} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/pacientform" component={PacientForm}/>
            <Route exact path="/logout" component={Logout}/>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user?.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveUserInfo: (token, userId) => dispatch(actions.retrieveUserInfo(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
