import './App.css'
import { ChakraProvider} from '@chakra-ui/react'
import { Routes,Route} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login';


function App() {
  return (
    <ChakraProvider>
      <div className="App">
      <div className="content-container">
            <Routes>
              <Route path ="/" element ={<Home/>}/>
              <Route path ="/login" element ={<Login/>}/>
            </Routes>
          </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
