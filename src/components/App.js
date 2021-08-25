import Header from '../components/ui/Header'
import { ThemeProvider } from '@material-ui/core/styles';

import Theme from './ui/Theme'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Header />
      Hello!
    </ThemeProvider>
  );
}

export default App;
