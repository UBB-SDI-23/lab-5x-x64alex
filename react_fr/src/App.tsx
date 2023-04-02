import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ClientShowAll } from './components/ClientShowAll'
import { Allclients } from './components/ClientShowAll2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppMenu } from './components/AppMenu'
import { AppHome } from './components/AppHome'

function App() {
  const [count, setCount] = useState(0)

  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/clients" element={<Allclients />} />

				</Routes>
			</Router>
		</React.Fragment>
  )
}

export default App
