import React from 'react';
import './App.css';
import {Button} from 'reactstrap';
import Movie from './components/Movie';
import Header from './components/Header';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import TV from './components/TV-Show';
import Anime from './components/Anime';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import  {useDarkMode} from "./components/useDarkMode";

function App() {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const themeText = theme === 'light' ? 'Dark' : 'Light';
  return (
    <BrowserRouter>
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
    <div className="App">
        <Header />
        <div className="text-right mt-2 mr-2">
                <Button onClick={themeToggler} color="warning" style={{borderRadius: "20px"}} className="dark"> Switch to {themeText} Mode</Button>
        </div>
        <Switch>
        <Route path="/movie"><Movie/></Route>
        <Route path="/tv-show"><TV/></Route>
        <Route path="/anime"><Anime/></Route>
        </Switch>
    </div>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
