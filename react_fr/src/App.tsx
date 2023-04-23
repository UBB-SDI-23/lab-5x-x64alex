import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ClientShowAll } from './components/ClientShowAll'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppMenu } from './components/AppMenu'
import { AppHome } from './components/AppHome'
import { AllProducts } from './components/products/AllProducts'
import { ProductDelete } from './components/products/ProductDelete'
import { ProductAdd } from './components/products/ProductAdd'
import { ProductDetails } from './components/products/ProductDetails'
import { ProductUpdate } from './components/products/ProductUpdate'
import { AllCategories } from './components/categories/AllCategories'
import { CategoryAdd } from './components/categories/CategoryAdd'
import { CategoryDelete } from './components/categories/CategoryDelete'
import { CategoryDetails } from './components/categories/CategoryDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/products" element={<AllProducts />} />
          			<Route path="/products/add" element={<ProductAdd />} />
          			<Route path="/products/:productId/details" element={<ProductDetails />} />
          			<Route path="/products/:productId/delete" element={<ProductDelete />} />
          			<Route path="/products/:productId/edit" element={<ProductUpdate />} />

					<Route path="/categories" element={<AllCategories/>} />
					{/* <Route path="/categories/add" element={<CategoryAdd />} /> */}
          			<Route path="/categories/:categoryId/details" element={<CategoryDetails />} />
          			<Route path="/categories/:categoryId/delete" element={<CategoryDelete />} />
          			{/* <Route path="/categories/:categoryId/edit" element={<CategoryUpdate />} /> */}

				</Routes>
			</Router>
		</React.Fragment>
  )
}

export default App
