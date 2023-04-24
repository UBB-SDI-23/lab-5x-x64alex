import { Card, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TransactionDTO } from "../../models/Transaction/TransactionDTO";

export const TransactionDetails = () => {
	const { transactionId } = useParams();
	const [transaction, setTransaction] = useState<TransactionDTO>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/categories/${transactionId}`);
			const data = await response.json();
			setTransaction(data);

		};
		fetchProduct();
	}, [transactionId]);

	return (
		<Container>
			<Card>
				<CardContent>
				<Stack  spacing={2}   alignItems="left">
					<Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						<h1>Transaction Details</h1>

					</Stack>
					<p>Transaction Date: {new Date(transaction!.transactionDate).toLocaleDateString()}</p>
					<p>Transaction Quantity: {transaction?.transactionQuantity}</p>
                    <p>Transaction client:</p>
                    <ul>
                        <li>First Name: {transaction?.clientDTO.clientFirstName}</li>
                        <li>Last Name: {transaction?.clientDTO.clientLastName}</li>
                        <li>Address: {transaction?.clientDTO.clientAddress}</li>
                        <li>Email: {transaction?.clientDTO.clientEmail}</li>
                        <li>Phone number: {transaction?.clientDTO.clientPhoneNumber}</li>
                    </ul>

                    <p>Transaction product:</p>
                    <ul>
                        <li>Name: {transaction?.productDTO.productName}</li>
                        <li>Price: {transaction?.productDTO.productPrice}</li>
                        <li>Quantity: {transaction?.productDTO.productQuantity}</li>
                        <li>Weight: {transaction?.productDTO.productWeight}</li>
                        <li>OnSale: {transaction?.productDTO.productOnSale}</li>
                    </ul>
				</Stack>

			


				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/${transactionId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/${transactionId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
	
};