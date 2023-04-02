import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ClientShowAll } from './components/ClientShowAll'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppMenu } from './components/AppMenu'
import { AppHome } from './components/AppHome'
import { AllProducts } from './components/ProductShowAll'

function App() {
  const [count, setCount] = useState(0)

  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/products" element={<AllProducts />} />

				</Routes>
			</Router>
		</React.Fragment>
  )
}

export default App
