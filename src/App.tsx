import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import InitSimulation from './components/InitSimulation';
import Code from './components/Code';
import About from './components/About';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/'>
            <InitSimulation />
          </Route>
          <Route path='/code'>
            <Code />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
