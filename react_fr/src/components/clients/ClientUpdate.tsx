import {
	Container,
	IconButton,
	TextField,
	Stack,
    Card,
    CardContent,
    Button,
    CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { ClientUpdateDTO } from "../../models/Client/ClientUpdateDTO";

export const ClientUpdate= () => {
    const { clientId } = useParams();
	const navigate = useNavigate();
    const [clientFirstName, setClientFirstName] = useState<String>("");
    const [clientLastName, setClientLastName] = useState<String>("");
    const [clientAddress, setClientAddress] = useState<String>("");
    const [clientEmail, setClientEmail] = useState<String>("");
    const [clientPhoneNumber, setClientPhoneNumber] = useState<String>("");



	const [client, setClient] = useState<ClientUpdateDTO>({
	    clientFirstName:"",
        clientLastName:"",
        clientEmail: "",
        clientAddress: "",
        clientPhoneNumber: "",
	});

    useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/clients/${clientId}`);
			const data = await response.json();
            setClientFirstName(data.clientFirstName)
            setClientLastName(data.clientLastName)
            setClientAddress(data.clientAddress)
            setClientEmail(data.clientEmail)
            setClientPhoneNumber(data.clientPhoneNumber)
			setClient(data);

		};
		fetchProduct();
	}, [clientId]);

    const updateClient = async (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			await axios.put(`${BACKEND_API_URL}/clients/${clientId}`, client);
			alert("Client updated")
			navigate("/clients");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/clients`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={updateClient}>
						<TextField
                            value={clientFirstName} 
                            type="string"
							id="name"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {client.clientFirstName = newValue.target.value; setClientFirstName(client.clientFirstName)}}
						/>
                        <TextField
                            value={clientLastName} 
                            type="string"
							id="name"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {client.clientLastName = newValue.target.value; setClientLastName(client.clientLastName)}}
						/>
                        <TextField
                            value={clientEmail} 
                            type="string"
							id="name"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {client.clientEmail = newValue.target.value; setClientEmail(clientEmail)}}
						/>
                        <TextField
                            value={clientAddress} 
                            type="string"
							id="name"
							label="Address"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {client.clientAddress = newValue.target.value; setClientAddress(clientAddress)}}
						/>
                        <TextField
                            value={clientPhoneNumber} 
                            type="string"
							id="name"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {client.clientPhoneNumber = newValue.target.value; setClientPhoneNumber(clientPhoneNumber)}}
						/>

					

						<Button id = "submitButton" type="submit">Update Client</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};