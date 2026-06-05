
import ProductList from './pages/Prouduct_List/ProductList'
import Header from './components/common/Header'
import { StoreProvider } from './context/store'

const App = () => {
  return (
    <div>
  <StoreProvider>
      <Header />
      <ProductList />
    </StoreProvider>
    </div>
  )
}

export default App
