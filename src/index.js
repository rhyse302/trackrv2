import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import './index.css';
import { theme } from '@chakra-ui/react';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

//If for some reason there are any more issues, wrap this in a React.StrictMode element
root.render(
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode='system'} />
      <App />
    </ChakraProvider>
);