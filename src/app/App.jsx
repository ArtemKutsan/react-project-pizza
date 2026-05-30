import Sidebar from '../widgets/sidebar/Sidebar';
import AppRouter from './providers/router/AppRouter';
import './styles/App.css';

function App() {
  return (
    <>
      <Sidebar />
      <AppRouter />
    </>
  );
}

export default App;
