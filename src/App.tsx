import React from 'react';
import 'leaflet/dist/leaflet.css';
import {SettingsProvider} from "./contexts/SettingsContext";
import ThemeProvider from "./theme";
import Router from "./routes";
import ThemeSettings from "./layout/component/settings";

function App() {
  return (
      <SettingsProvider>
          <ThemeProvider>
              <ThemeSettings>
                  {/*<Provider>*/}
                    <Router />
                  {/*</Provider>*/}
              </ThemeSettings>
          </ThemeProvider>
      </SettingsProvider>
  );
}

export default App;
