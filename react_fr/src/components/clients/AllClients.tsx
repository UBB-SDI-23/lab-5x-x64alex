import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
	TextField,
	Stack,
	TableSortLabel,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProductTransactions } from "../../models/Product/ProductTransactions";
import { ClientDTO } from "../../models/Client/ClientDTO";

export const AllClients = () => {
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(50);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/clients?pageNumber=${pageNumber}&pageSize=${pageSize}`)
			.then((response) => response.json())
			.then((data) => {
				setclient(data);
				setLoading(false);
			});
	}, [pageNumber]);

	const [loading, setLoading] = useState(false);
    const [clients, setclient] = useState<ClientDTO[]>([]);

	return (
		<Container>
			<h1>All clients</h1>
			<Stack direction="row" spacing={2}   alignItems="center">
				<h3>Add a client:</h3>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/add`}>
					<Tooltip title="Add a new client" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
				<IconButton edge="start" onClick={() => {if(pageNumber>0){setPageNumber(pageNumber-1)}}}>
        			<ArrowBackIcon>Go to back clients:</ArrowBackIcon>
      			</IconButton>
				<IconButton edge="start" onClick={() => {if(clients.length == pageSize){setPageNumber(pageNumber+1)}}}>
        			<ArrowForwardIcon>Go to next clients:</ArrowForwardIcon>
      			</IconButton>
			</Stack>
			 			
			{loading && <CircularProgress />}
			{!loading && clients.length === 0 && <p>No clients found</p>}

			{!loading && clients.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Address</TableCell>
								<TableCell align="right">Phone number</TableCell>
								<TableCell align="center">Nr. Transactions</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients.map((client: ClientDTO, index) => (
								<TableRow key={client.clientId}>
									<TableCell component="th" scope="row">
										{pageNumber*pageSize+index+1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/clients/${client.clientId}/details`} title="View client details">
											{client.clientFirstName}
										</Link>
									</TableCell>
									<TableCell align="right">{client.clientLastName}</TableCell>
									<TableCell align="right">{client.clientEmail}</TableCell>
									<TableCell align="right">{client.clientAddress}</TableCell>
									<TableCell align="right">{client.clientPhoneNumber}</TableCell>
									<TableCell align="right">{client.clientPhoneNumber}</TableCell>
									<TableCell align="center">{client.transactionsCount}</TableCell>
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.clientId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.clientId}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};