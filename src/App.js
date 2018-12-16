//Depends
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled, {ThemeProvider} from 'styled-components'
import Theme from './styles/theme'
import store from './store.js'

//Components
import DisplayWindowProvider from './components/data/DisplayWindowProvider'
import Updater from './components/data/Updater'

class App extends Component {
  render() {
    return (
        <ThemeProvider theme={Theme}>
        <Provider store={store}>
            <Root className="App">
                <Updater />
                <DisplayWindowProvider />
            </Root>
        </Provider>
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
