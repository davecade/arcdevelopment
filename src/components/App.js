import Header from '../components/ui/Header'
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Theme from './ui/Theme'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path="/" component={() => <div>Home</div>} />
            <Route exact path="/services" component={() => <div>Services</div>} />
            <Route exact path="/customsoftware" component={() => <div>Customer Software</div>} />
            <Route exact path="/mobileapps" component={() => <div>Mobile Apps</div>} />
            <Route exact path="/websites" component={() => <div>Websites</div>} />
            <Route exact path="/revolution" component={() => <div>Revolution</div>} />
            <Route exact path="/about" component={() => <div>About</div>} />
            <Route exact path="/contact" component={() => <div>Contact</div>} />
            <Route exact path="/estimate" component={() => <div>Estimate</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
