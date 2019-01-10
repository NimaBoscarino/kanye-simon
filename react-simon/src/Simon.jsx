import React, {Component} from 'react';
import styled from 'styled-components'

const SimonContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class SimonTile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      url: 'build/' + props.url + '.png'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    this.props.pushPattern(this.props.url)

    this.setState({
      url: 'build/' + this.props.url + '_light.png'
    }, () => {
      setTimeout(() => this.setState({
        url: 'build/' + this.props.url + '.png'
      }), 500)
    })
  }

  render() {
    if (this.props.lit) {
      return (
        <img onClick={this.handleClick} src={'build/' + this.props.url + '_light.png'} />
      )
    }

    return (
      <img onClick={this.handleClick} src={this.state.url} />
    )
  }
}

class Simon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pattern: []
    }
  }

  render() {
    return (
      <div>
        <SimonContainer>
          <SimonTile lit={this.props.lit === 'green'} pushPattern={this.props.pushPattern} url='green' />
          <SimonTile lit={this.props.lit === 'red'} pushPattern={this.props.pushPattern} url='red' />
        </SimonContainer>
        <SimonContainer>
          <SimonTile lit={this.props.lit === 'yellow'} pushPattern={this.props.pushPattern} url='yellow' />
          <SimonTile lit={this.props.lit === 'blue'} pushPattern={this.props.pushPattern} url='blue' />
        </SimonContainer>
      </div>
    );
  }
}
export default Simon;
