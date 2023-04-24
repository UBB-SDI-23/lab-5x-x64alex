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
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { Client } from "../../models/Client/Client";
import { TransactionIdDTO } from "../../models/Transaction/TransactionIdDTO";

export const TransactionAdd = () => {
	const navigate = useNavigate();

	const [transaction, setTransaction] = useState<TransactionIdDTO>({
	    transactionDate: new Date(),
        transactionQuantity: 0
	});

	const addTransaction = (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			axios.post(`${BACKEND_API_URL}/transactions`, transaction);
			alert("Transaction added")
			navigate("/transactions");
		} catch (error) {
			alert(error);
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


					

						<Button id = "submitButton" type="submit">Add Transactio </Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};