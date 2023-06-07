import { Card, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Client } from "../../models/Client/Client";
import Grid from '@mui/material/Grid'; // Grid version 1

export const ClientDetails = () => {
	const { clientId } = useParams();
	const [client, setClient] = useState<Client>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/clients/${clientId}`);
			const data = await response.json();
			setClient(data);

		};
		fetchProduct();
	}, [clientId]);

	return (
		<Container>
			<Card>
				<CardContent>
				<Stack  spacing={2}   alignItems="left">
					<Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						<h1>Client Details</h1>

					</Stack>
					<p>Client First Name: {client?.clientFirstName}</p>
                    <p>Client Last Name: {client?.clientLastName}</p>
					<p>Email: {client?.clientEmail}</p>
                    <p>Address: {client?.clientAddress}</p>
                    <p>Phone number: {client?.clientPhoneNumber}</p>

					<p>Client transactions:</p>


                    <Grid container spacing={1}>
                        {client?.transactions?.map((transaction) => {
                        return (<Grid item>
                        <li>Transaction date: {transaction.transactionDate.toString()}</li>
                        <li>Transaction Quantity: {transaction.transactionQuantity}</li>

                        </Grid>)
                    })}
                    </Grid> 
				</Stack>


				</CardContent>
				{/* <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${clientId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${clientId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions> */}
			</Card>
		</Container>
	);
	
};