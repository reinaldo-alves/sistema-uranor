import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ListStore } from './contexts/ListContext';
import { MediumStore } from './contexts/MediumContext';
import { UserStore } from './contexts/UserContext';
import { MenuStore } from './contexts/MenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MediumStore>
      <ListStore>
        <MenuStore>
          <UserStore>
            <App />
          </UserStore>
        </MenuStore>
      </ListStore>
    </MediumStore>
  </React.StrictMode>
);
