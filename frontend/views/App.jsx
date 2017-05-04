import React from 'react';
import Cover from './components/Cover.jsx';
import Event from './components/Event.jsx';

class App extends React.Component {
   render() {
      return (
         <div>
            <Cover />
            <Event />
         </div>
      );
   }
}

export default App;
