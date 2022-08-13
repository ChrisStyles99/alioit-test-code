import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FootballList from './pages/FootballList';
import League from './pages/League';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<FootballList />} />
        <Route path='/:amiibo' element={<League />} />
      </Routes>
    </div>
  );
}

export default App;
