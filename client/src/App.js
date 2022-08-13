import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FootballList from './pages/FootballList';
import League from './pages/League';
import SavedLeague from './pages/SavedLeague';
import SavedLeagues from './pages/SavedLeagues';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { socketToast } from './utils/socketToast';

const socket = io('http://localhost:5000');

function App() {

  useEffect(() => {
    socket.on('getting-leagues', (msg) => socketToast(msg, 'info'));

    socket.on('getting-leagues-success', (msg) => socketToast(msg, 'success'));

    socket.on('getting-leagues-error', (msg) => socketToast(msg, 'error'));
    
    socket.on('getting-stats', (msg) => socketToast(msg, 'info'));

    socket.on('getting-stats-success', (msg) => socketToast(msg, 'success'));

    socket.on('getting-stats-error', (msg) => socketToast(msg, 'error'));

    socket.on('adding-league', msg => socketToast(msg, 'info'));

    socket.on('adding-league-success', msg => socketToast(msg, 'success'));

    socket.on('adding-league-error', msg => socketToast(msg, 'error'));

    socket.on('adding-stat', msg => socketToast(msg, 'info'));

    socket.on('adding-stat-success', msg => socketToast(msg, 'success'));

    socket.on('adding-stat-error', msg => socketToast(msg, 'error'));

    return () => socket.off();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
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
