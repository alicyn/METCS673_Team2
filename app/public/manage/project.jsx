class ReactApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_email: 'hello@example.com'
    };
  }
  componentDidMount(){
    var self = this;
    var user = self.props.firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);

        self.setState({
          user_email: profile.email
        })
      });
    }else{
      console.log('no user :(');
    }
  }
  render(){
    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Home</span>
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search"/>
                <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
              <li className="mdl-menu__item">About</li>
              <li className="mdl-menu__item">Contact</li>
              <li className="mdl-menu__item">Legal information</li>
            </ul>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
          <header className="demo-drawer-header">
            <img src="/images/user.jpg" className="demo-avatar"/>
            <div className="demo-avatar-dropdown">
              <span>{this.state.user_email}</span>
              <div className="mdl-layout-spacer"></div>
              <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">arrow_drop_down</i>
                <span className="visuallyhidden">Accounts</span>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                <li className="mdl-menu__item">hello@example.com</li>
                <li className="mdl-menu__item">info@example.com</li>
                <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
              </ul>
            </div>
          </header>
          <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
            <a className="mdl-navigation__link" href="/manage"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Projects</a>
            <a className="mdl-navigation__link" href="/chat"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">chat</i>Chat</a>
            <a className="mdl-navigation__link" href="/issues"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Issues</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Admin</a>
            <div className="mdl-layout-spacer"></div>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
            <p>Some text</p>
          </div>
        </main>
      </div>
    );
  }
}