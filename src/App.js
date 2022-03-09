import './scss/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoApp from './TodoApp';

function App() {
  return (
    <>
      <BrowserRouter>
        <TodoApp />
      </BrowserRouter>
    </>
  );
}

export default App;



// true or false state wala kam krna h 
