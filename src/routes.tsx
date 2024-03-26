import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Plans from './pages/plans';
import Summary from './pages/summary';

export default function RouteNavigator() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/planes" element={<Plans />} />
        <Route path="/resumen" element={<Summary />} />
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  );
}
