import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@translation/localize";
import { RTLWrapper } from "@translation/RTLWrapper";
import { Navigator } from "@navigation/navigator";
import { store, persistor } from "@store";
import { ThemeProvider } from "@/theme";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RTLWrapper>
          <ThemeProvider>
            <Navigator />
          </ThemeProvider>
        </RTLWrapper>
      </PersistGate>
    </Provider>
  );
}
