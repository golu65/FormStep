
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductApp from '../components/NewProductsList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container App">
        <ProductApp />
      </div>
    </QueryClientProvider>
  );
}

export default App;
