import React from 'react';
import NavigationHeader from './Components/Header';
import LeftSidebar from './Components/LeftSidebar';
import ItemDisplay from './Components/ItemDisplay';
const App: React.FC = () => {
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavigationHeader />
      <div style={{ display: 'flex', flex: 1 }}>
        <LeftSidebar/>
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <ItemDisplay/>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
