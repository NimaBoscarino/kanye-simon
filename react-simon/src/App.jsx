import React, {Component} from 'react';
import Simon from './Simon.jsx'
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props)

    this.socket = io('http://localhost:4000');

    this.state = {
      waiting: false,
      playerA: false,
      pattern: []
    }

    this.handleStart = this.handleStart.bind(this)
    this.handleWait = this.handleWait.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.playPattern = this.playPattern.bind(this)
    this.pushPattern = this.pushPattern.bind(this)

    this.socket.on('connect', () => {
      this.socket.on('start', this.handleStart);
      this.socket.on('wait', this.handleWait);
      this.socket.on('playPattern', this.playPattern)
    })
  }

  handleStart(message) {
    console.log("START!", message)
    this.setState({
      playerA: true,
      waiting: false
    })
  }

  handleWait(message) {
    console.log("WAIT!", message)
    this.setState({
      waiting: true,
      playerA: false
    })
  }

  playPattern(message) {
    console.log("PLAY THE PATTERN")
  }

  handleSubmit() {
    // get the state pattern, and send to server
    const pattern = this.state.pattern
    this.socket.emit('newPattern', {
      pattern: pattern
    });
    console.log('asdasdasd')
  }

  pushPattern(tile) {
    console.log(tile)
    this.setState({
      pattern: [
        ...this.state.pattern,
        tile
      ]
    })
  }

  render() {
    return (
      <div>
        <h1>
        {
          this.state.playerA ? (
            <div>
              <h1>Play the Pattern</h1>
              <button onClick={this.handleSubmit}>SUBMIT</button>
            </div>  
          ) : (
            null
          )
        }
        </h1>
        <Simon pushPattern={this.pushPattern} playerA={this.state.playerA} />
      </div>
    );
  }
}
export default App;
