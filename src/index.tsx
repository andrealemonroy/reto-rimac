import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RouteNavigator from './routes';
import PlanProvider from './redux/provider/PlanProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PlanProvider>
      <RouteNavigator />
    </PlanProvider>
  </React.StrictMode>
);

reportWebVitals();
