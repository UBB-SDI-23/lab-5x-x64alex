import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
import { CategoryUpdate } from './components/categories/CategoryUpdate'
import { AllClients } from './components/clients/AllClients'
import { ClientDelete } from './components/clients/ClientDelete'
import { ClientDetails } from './components/clients/ClientDetails'
import { ClientAdd } from './components/clients/ClientAdd'
import { ClientUpdate } from './components/clients/ClientUpdate'
import { AllTransactions } from './components/transactions/AllTransactions'
import { TransactionDelete } from './components/transactions/TransactionDelete'
import { TransactionAdd } from './components/transactions/TransactionAdd'
import { TransactionDetails } from './components/transactions/TransactionDetails'
import { Login } from './components/login/LogIn'
import { UserProfile } from './components/UserProfile'
import { Register } from './components/login/Reigister'
import { Confirmation } from './components/login/Confirmation'
import { AdminDashboard } from './components/AdminDashboard'
import { AppChat } from './components/chat/Chat'

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
					<Route path="/categories/add" element={<CategoryAdd />} />
          			<Route path="/categories/:categoryId/details" element={<CategoryDetails />} />
          			<Route path="/categories/:categoryId/delete" element={<CategoryDelete />} />
          			<Route path="/categories/:categoryId/edit" element={<CategoryUpdate />} />

					<Route path="/clients" element={<AllClients/>} />
					<Route path="/clients/add" element={<ClientAdd />} />
					<Route path="/clients/:clientId/details" element={<ClientDetails />} />
					<Route path="/clients/:clientId/delete" element={<ClientDelete />} />
					<Route path="/clients/:clientId/edit" element={<ClientUpdate />} />

					<Route path="/transactions" element={<AllTransactions/>} />
					<Route path="/transactions/add" element={<TransactionAdd />} />
					<Route path="/transactions/:transactionId/details" element={<TransactionDetails />} />
					<Route path="/transactions/:transactionId/delete" element={<TransactionDelete />} />
					<Route path="/transactions/:transactionId/edit" element={<TransactionAdd />} />

					<Route path="/login" element={<Login/>} />

					<Route path="/user/:userName" element={<UserProfile/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="/confirmation" element={<Confirmation/>} />
					<Route path="/admin" element={<AdminDashboard/>} />
					<Route path="/chat" element={<AppChat />} />



				</Routes>
			</Router>
		</React.Fragment>
  )
}

export default App
server {
    server_name exquisite-fox.chickenkiller.com;

    location / {
        proxy_pass http://app:8080/;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
    }

    location /ws {
        proxy_pass http://app:8080/ws;

        proxy_http_version 1.1;

        proxy_set_header        Host $host:8000;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;

        proxy_set_header      Connection "keep-alive, Upgrade";
        proxy_set_header      Upgrade websocket;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate fullchain.pem; # managed by Certbot
    ssl_certificate_key privkey.pem; # managed by Certbot
    include options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = exquisite-fox.chickenkiller.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;
    server_name exquisite-fox.chickenkiller.com;
    return 404; # managed by Certbot

    location / {
        add_header Access-Control-Allow-Origin "https://tchibo-cafeluta.netlify.app";
        add_header Access-Control-Allow-Methods "*";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
        add_header Access-Control-Expose-Headers "Content-Length,Content-Range";
    }
}