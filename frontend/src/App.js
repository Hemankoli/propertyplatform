import './App.css';
import AppRoutes from './AppRoutes';
import { MainProvider } from './context';

function App() {
  return (
    <MainProvider>
      <AppRoutes />
    </MainProvider>
  );
}

export default App;
