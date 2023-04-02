import React, { useEffect, useState } from "react"


const BASE_URL = "http://localhost:8080/clients";


const api = axios.create({
  baseURL: BASE_URL
})

const App = () => {
  const [clients, setClients] = useState([])

  const fetchUserData = () => {
    fetch(apiString)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setClients(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>
      {clients.length > 0 && (
        <ul>
          {clients.map(client => (
            <li key={client.clientId}>{client.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;