import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeOne from './Home/home';
import SecondStep from './FormComponent/secondform';
import DataDisplay from './FormComponent/DataDisplay';
import SecondAppOne from './App/SecondApp'



function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomeOne />} />
          <Route path='/secondstep' element={<SecondStep/>} />
          <Route path='/displaydata' element={<DataDisplay/>} />
          <Route path='/apitask' element={<SecondAppOne/>} />
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
