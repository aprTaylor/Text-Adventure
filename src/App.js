//Depends
import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components'
import Theme from './styles/theme'

//Components
import DisplayWindowProvidor from './components/data/DisplayWindowProvidor'
class App extends Component {
  render() {
    return (
        <ThemeProvider theme={Theme}>
            <Root className="App">
                <DisplayWindowProvidor />
            </Root>
        </ThemeProvider>
    );
  }
}

const Root = styled.div`
    height: 100%;
    width: 100%;
    background: ${props => props.theme.colors.background}
`

export default App;
