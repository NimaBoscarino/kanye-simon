import React, {Component} from 'react';
import styled from 'styled-components'

const SimonContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class Simon extends Component {
  render() {
    return (
      <div>
        <SimonContainer>
          <img src="build/green.png" />
          <img src="build/red.png" />
        </SimonContainer>
        <SimonContainer>
          <img src="build/yellow.png" />
          <img src="build/blue.png" />
        </SimonContainer>
      </div>
    );
  }
}
export default Simon;
