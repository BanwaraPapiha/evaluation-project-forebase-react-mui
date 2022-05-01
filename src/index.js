import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';

import SurveyProvider from './providers/surveyProvider';
import UserProvider from './providers/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* Context */}
    <UserProvider>
    <SurveyProvider>      
      <AppRouter />
    </SurveyProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
