import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div>
          {"Hello it's me!"}
        </div>
      </div>
    );
  }
}

// redux tutorial
// build this in redux

// airbnb style guide for all vscode projs

// google api to read text from pictures
// css modules

// refactor to React-Native

// deploy on heroku -- no db
// deploy on docker -- no db
// deploy on aws -- no db

ReactDOM.render(<App />, document.getElementById('app'));
