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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL, authorization } from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { Client } from "../../models/Client/Client";

export const ClientAdd = () => {
	const navigate = useNavigate();

	const [client, setclient] = useState<Client>({
	    clientFirstName:"",
        clientLastName:"",
        clientEmail: "",
        clientAddress: "",
        clientPhoneNumber: "",
        transactions: []
	});

	const config = {
		headers: {
		  Authorization: authorization,
		  'Content-Type': 'application/json'
		}
};

	const addclient = (event: { preventDefault: () => void }) => {

		event.preventDefault();
		if(client.clientFirstName === "" || client.clientLastName || client.clientEmail === "" || client.clientAddress === "" || client.clientPhoneNumber === "")
		{
			alert("Error: all textfileds must not be empty")
		}
		else{
			try {
				axios.post(`${BACKEND_API_URL}/clients`, client, config);
				alert("Client added")
				navigate("/clients");
			} catch (error) {
				alert(error);
			}
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

					<form onSubmit={addclient}>
						<TextField
                            type="string"
							id="name"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => client.clientFirstName = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="name"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => client.clientLastName = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="name"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => client.clientEmail = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="name"
							label="Address"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => client.clientAddress = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="name"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => client.clientPhoneNumber = newValue.target.value}
						/>

					

						<Button id = "submitButton" type="submit">Add Client</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};