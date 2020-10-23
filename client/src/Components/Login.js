import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super()
    this.state = { token: '' }
  }

  // #1 Called right after component mount.
  componentDidMount() {
    this.googleSDK()
  }

  // #4 Login function implementation
  login = () => {
    this.auth2.signIn().then((googleUser) => {
      let profile = googleUser.getBasicProfile()
      console.log('Token || ' + googleUser.getAuthResponse().id_token)
      console.log('ID: ' + profile.getId())
      console.log('Name: ' + profile.getName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      this.setState({ token: googleUser.getAuthResponse().id_token })
    })
  }

  // #5 Logout function implementation
  logout = () => {
    this.setState({ token: '' })
    this.auth2.disconnect()
  }

  googleSDK = () => {
    // #3 After loading platform.js script, call gapi.auth2.init function and activate login button function.
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        // https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
        // https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
        this.auth2 = window['gapi'].auth2.init({
          client_id: 'GCP_OAUTH2_CLIENNT_ID',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        })
      })
    }

    // Add <script id="google-jssdk" src="https://.../platform.js?onload=googleSDKLoaded"></script> to document
    // Call googleSDKLoaded when script code is loaded.
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'google-jssdk')
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-12">
          <h2 className="text-left">Google Login Demo</h2>
          <div className="card mt-3">
            <div className="card-body">
              <div className="row mt-5 mb-5">
                <div className="col-md-4 mt-2 m-auto">
                  {this.state.token ? (
                    <button className="logoutBtn loginBtn--google" onClick={this.logout}>
                      Logout
                    </button>
                  ) : (
                    <button className="loginBtn loginBtn--google" onClick={this.login} ref="">
                      Login with Google
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
