import React, { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import Spinning from './components/Spinning';
import './resources/main.scss';

function App() {
  return (
    <Suspense fallback={Spinning}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
