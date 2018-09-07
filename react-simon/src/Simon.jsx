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
          <SimonTile pushPattern={this.props.pushPattern} url='green' />
          <SimonTile pushPattern={this.props.pushPattern} url='red' />
        </SimonContainer>
        <SimonContainer>
          <SimonTile pushPattern={this.props.pushPattern} url='yellow' />
          <SimonTile pushPattern={this.props.pushPattern} url='blue' />
        </SimonContainer>
      </div>
    );
  }
}
export default Simon;
