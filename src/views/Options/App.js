import React, { Component } from 'react';
import './App.css';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      name: ''
    };
  }

  render() {
    return (
      <div class="option">
      <label>{this.props.name }</label>
      <input
        name={this.props.name}
        type="checkbox"
        checked={this.props.value}
        onChange = {this.props.onChange}
      />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        crabMode: false,
        usefulMode: false,
        silentMode: false,
        username: ''
      }
    }
  }

componentWillMount() {
  // On app load, check if there's existing data. If not, set it.
  chrome.storage.sync.get('data', (result) => {
    //use "in" check as a regular if(result.allData) will
    //return false for empty arrays

    console.log('result data', result.data)
    if ( 'data' in result ) {
      this.setState({ data: result.data });
    } else chrome.storage.sync.set({ data: {} });
  });
  this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = (target.name.charAt(0).toLowerCase() + target.name.slice(1)).replace(' ', '');
  let data = {...this.state.data};
  data[name] = value;
  this.setState({
    data
  });
  console.log('new data: ', data)
  chrome.storage.sync.set({ data: data });
}

  render() {
    return (
      <div className='App'>
      <form>
        <input name="Username" type="text" value={this.state.username} onChange={this.handleChange}/>
        <Option name="Crab Mode" value={this.state.crabMode} onChange={this.handleChange}/>
        <Option name="Useful Mode" value={this.state.usefulMode} onChange={this.handleChange}/>
          <Option name="Silent Mode" value={this.state.silentMode} onChange={this.handleChange}/>
      </form>
      </div>
    );
  }
}

export default App
