import { Card, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Client } from "../../models/Client/Client";

export const ClientDetails = () => {
	const { ClientId } = useParams();
	const [client, setClient] = useState<Client>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/categories/${ClientId}`);
			const data = await response.json();
			setClient(data);

		};
		fetchProduct();
	}, [ClientId]);

	return (
		<Container>
			<Card>
				<CardContent>
				<Stack  spacing={2}   alignItems="left">
					<Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						<h1>Client Details</h1>

					</Stack>
					<p>Client First Name: {client?.clientFirstName}</p>
                    <p>Client Last Name: {client?.clientLastName}</p>
					<p>Email: {client?.clientEmail}</p>
                    <p>Address: {client?.clientAddress}</p>
                    <p>Phone number: {client?.clientPhoneNumber}</p>

					{/* <p>Category products:</p>
					<ul>
                        {category?.products.map(
                            (product: Product) => {
                                <li>
                                <p>Product Name: {product?.productName}</p>
                                <p>Product Price: {product?.productPrice}</p>
                                <p>Product Quantity: {product?.productQuantity}</p>
                                <p>Product Sale: {String(product?.productOnSale)}</p>
                                <p>Product Weight: {product?.productWeight}</p>
                                <p>Product Description: {product?.productDescription}</p>
                            }
                            </li>
                        )
                        }
					</ul> */}
				</Stack>

			


				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${ClientId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${ClientId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
	
};