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
  render() {
    return (
      <div>
        <SimonContainer>
          <SimonTile url='green' />
          <SimonTile url='red' />
        </SimonContainer>
        <SimonContainer>
          <SimonTile url='yellow' />
          <SimonTile url='blue' />
        </SimonContainer>
      </div>
    );
  }
}
export default Simon;
