import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FootballList from './pages/FootballList';
import League from './pages/League';
import SavedLeague from './pages/SavedLeague';
import SavedLeagues from './pages/SavedLeagues';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<FootballList />} />
        <Route path='/league/:leagueId' element={<League />} />
        <Route path='/saved' element={<SavedLeagues />} />
        <Route path='/saved/:leagueId' element={<SavedLeague />} />
      </Routes>
    </div>
  );
}

export default App;
