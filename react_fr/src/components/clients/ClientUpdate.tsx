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
import { Client } from "../../models/Client/Client";

export const ClientUpdate= () => {
    const { clientId } = useParams();
	const navigate = useNavigate();

	const [client, setClient] = useState<Client>({
	    clientFirstName:"",
        clientLastName:"",
        clientEmail: "",
        clientAddress: "",
        clientPhoneNumber: "",
        transactions: []
	});

    useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/clients/${clientId}`);
			const data = await response.json();
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

					

						<Button id = "submitButton" type="submit">Update Client</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};