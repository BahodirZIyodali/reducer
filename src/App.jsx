import './App.css'
import Homework from './components/Homework9'
import HomeworkID from './components/HomeworkID'
import Error from './components/Error'
import {Route,Routes} from 'react-router-dom'
function App() {
return(
  <Routes>
  <Route path='/post/' element={  <Homework/>}/>
  <Route path='/' element={  <Homework/>}/>
  <Route path='/post/:ids' element={  <HomeworkID/>}/>
  <Route path='*' element={  <Error/>}/>
  </Routes>
  )
} 
export default App
