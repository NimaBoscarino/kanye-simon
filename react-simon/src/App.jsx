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
      playerBPlay: false,
      pattern: [],
      patternAttempt: [],
      lit: null
    }

    this.handleStart = this.handleStart.bind(this)
    this.handleWait = this.handleWait.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitAttempt = this.handleSubmitAttempt.bind(this)
    this.playPattern = this.playPattern.bind(this)
    this.pushPattern = this.pushPattern.bind(this)
    this.pushPatternAttempt = this.pushPatternAttempt.bind(this)

    this.socket.on('connect', () => {
      this.socket.on('start', this.handleStart);
      this.socket.on('wait', this.handleWait);
      this.socket.on('pattern', this.playPattern)
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

  playPattern({pattern}) {
    console.log("RECEIVED PATTERN", pattern)
    console.log("PLAY THE PATTERN")

    var x = 0;

    let slowLoop = () => {
      this.setState({
        lit: pattern[x]
      })
      if (x++ < pattern.length) {
        setTimeout(slowLoop, 1000);
      } else {
        console.log('Im done')
        this.socket.emit('donePlayback', {cool: 'story dude'});
        this.setState({
          playerBPlay: true
        })
      }
    }

    setTimeout(slowLoop, 2000);

    this.setState({
      lit: null
    })
  }

  handleSubmit() {
    // get the state pattern, and send to server
    const pattern = this.state.pattern
    this.socket.emit('newPattern', {
      pattern: pattern
    });
    console.log('asdasdasd')
  }

  handleSubmitAttempt() {
    const patternAttempt = this.state.patternAttempt
    this.socket.emit('newPatternAttempt', {
      pattern: patternAttempt
    });
    console.log('Submitted Attempt!')
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

  pushPatternAttempt(tile) {
    console.log(tile)
    if (this.state.playerBPlay) {
      this.setState({
        patternAttempt: [
          ...this.state.patternAttempt,
          tile
        ]
      })
    }
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
        {
          this.state.playerBPlay ? (
            <div>
              <h1>Play the Pattern Back!</h1>
              <button onClick={this.handleSubmitAttempt}>SUBMIT YOUR ATTEMPT</button>
              {
                this.state.patternAttempt
              }
            </div>  
          ) : (
            null
          )
        }
        </h1>
        <Simon
          pushPatternAttempt={this.pushPatternAttempt}
          pushPattern={this.pushPattern}
          playerA={this.state.playerA}
          lit={this.state.lit} />
      </div>
    );
  }
}
export default App;
