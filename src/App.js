//Depends
import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components'
import Theme from './styles/theme'

//Components
import DisplayWindowProvider from './components/data/DisplayWindowProvider'
import GlobalProvider from './GlobalContext';
class App extends Component {
  render() {
    return (
        <ThemeProvider theme={Theme}>
        <GlobalProvider>
            <Root className="App">
                <DisplayWindowProvider />
            </Root>
        </GlobalProvider>
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
