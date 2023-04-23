import { useEffect, useState } from "react";
import { Client } from "../models/Client/Client";

export const ClientShowAll = () => {
    const [clients, setClients] = useState([]);
  useEffect(() => {
    fetch("http://localhost:80/clients")
        .then((res) => res.json())
        .then((data) => setClients(data));
  }, [])

    if(clients.length == 0){
        return <div>No clients</div>
    }

    return (
      <div className="App">
            <h1>Clients list</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Client First Name</th>
                    <th>Client Last Name</th>
                    <th>Client email</th>
                    <th>Client Address</th>
                    <th>Client Phone Number</th>
                </tr>
                {clients.map((client: Client, index) =>(
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{client.clientFirstName}</td>
                        <td>{client.clientLastName}</td>
                        <td>{client.clientEmail}</td>
                        <td>{client.clientAddress}</td>
                        <td>{client.clientPhoneNumber}</td>
                    </tr>
                ))}
            </table>
      </div>
    )
  }
  
