import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = { token: '' };
    }

    // #1 Called right after component mount.
    componentDidMount() {
        this.googleSDK()
    }

    // #4 Login function implementation
    login = () => {
        this.auth2.signIn().then(googleUser => {
            let profile = googleUser.getBasicProfile();
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());

            this.setState({ token: googleUser.getAuthResponse().id_token });
        });
    }

    // #5 Logout function implementation
    logout = () => {
        this.setState({ token: '' });
        this.auth2.disconnect();
    }

    googleSDK = () => {
        
    }
}

export default Login;