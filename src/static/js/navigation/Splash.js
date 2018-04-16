import React, {Component} from 'react';

class Splash extends Component {

    constructor(props) {
        super(props)
        console.log("Splash constructed, props", this.props)
    }
    drawsignin(){
      // draw signin button if not logged in
      // this is handle by google code that replaces our div
      // with their own HTML/CSS.
      console.log("trying to draw login button.");
      window.gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.props.auth,
        'onfailure': (error) => console.log(error)
      })
    }
    componentWillMount(){
        this.drawsignin()
    }
		componentDidUpdate(prevProps, prevState){
        this.drawsignin()
		}

    render() {
          return (
                  <div className="my-signin2-body">
                    <div id="my-signin2"/>
                  </div>          
                )
    }
}

export default Splash;