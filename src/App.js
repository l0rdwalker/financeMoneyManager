import './App.scss';
import AsideBar from './components/SideBar/sidebar';
import Tree from './components/tree/Tree';
import { ThemeProvider } from '@material-ui/core';

function App() {
  return (

    //<ThemeProvider.Provider value 
    <div className="App">
      <AsideBar />
      <div className='Canvas'>
        <Tree />
      </div>
    </div>
  );
}

export default App;
