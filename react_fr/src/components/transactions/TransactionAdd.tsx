import {
	Container,
	IconButton,
	TextField,
	Stack,
    Card,
    CardContent,
    Button,
    CardActions,
    Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL, authorization } from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { Client } from "../../models/Client/Client";
import { TransactionIdDTO } from "../../models/Transaction/TransactionIdDTO";
import { ClientName } from "../../models/Client/ClientName";
import { ProductName } from "../../models/Product/ProductName";

export const TransactionAdd = () => {
	const date = new Date();
	const navigate = useNavigate();
	const [clients, setClients] = useState<ClientName[]>([]);
	const [searchString, setSearchString] = useState("");

	const config = {
		headers: {
		  Authorization: authorization,
		  'Content-Type': 'application/json'
		}
	}

    const [products, setProducts] = useState<ProductName[]>([]);
	const [searchString2, setSearchString2] = useState("");


	const [transaction, setTransaction] = useState<TransactionIdDTO>({
	    transactionDate: date,
        transactionQuantity: -1000,
        transactionId: -1000,
        clientId: -1000,
        productId: -1000 
	});

    useEffect(() => {
		fetch(`${BACKEND_API_URL}/clients/names?searchString=${searchString}`)
			.then((response) => response.json())
			.then((data) => {
				setClients(data);
			});

        fetch(`${BACKEND_API_URL}/products/names?searchString=${searchString2}`)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
			});
	}, [searchString, searchString2]);

	const addTransaction = (event: { preventDefault: () => void }) => {
		if(transaction.clientId ===-1000 || transaction.productId === -1000 || transaction.transactionDate === date ||transaction.transactionQuantity ===-1000)
		{
			alert("Error: all textfileds must not be empty")
		}
		else{
			event.preventDefault();
			try {
				axios.post(`${BACKEND_API_URL}/transactions`, transaction, config);
				alert("Transaction added")
				navigate("/transactions");
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
						<IconButton component={Link} sx={{ mr: 3 }} to={`/transactions`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={addTransaction}>
						<TextField
                            type="string"
							label="Transaction date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {transaction.transactionDate = new Date(newValue.target.value)}}
						/>
                        <TextField
                            type="number"
							label="Transaction quantity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => transaction.transactionQuantity = Number(newValue.target.value)}
						/>

						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={clients.map((client) => client.clientLastName)}
							sx={{ mb: 2 }}
							onChange={(e, value) => {
								for (let i = 0; i < clients.length; i++) {
									if(clients[i].clientLastName === value){
										transaction.clientId = clients[i].clientId;
									}
								}
							}}
							renderInput={(params) => <TextField {...params} label="Category Names" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/>

                        <Autocomplete
							disablePortal
							id="combo-box-demo"
							options={products.map((product) => product.productName)}
							sx={{ mb: 2}}
							onChange={(e, value) => {
								for (let i = 0; i < products.length; i++) {
									if(products[i].productName === value){
										transaction.productId = products[i].productId;
									}
								}
							}}
							renderInput={(params) => <TextField {...params} label="Product Names" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/>
					

						<Button id = "submitButton" type="submit">Add Transaction </Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};