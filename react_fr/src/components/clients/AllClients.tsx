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
	Box,
	Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL, canAdd, canEdit, isLoggedIn } from "../../constants";
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
			{canAdd()&&
			<Stack direction="row" spacing={2}   alignItems="center">
				<h3>Add a client:</h3>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/add`}>
					<Tooltip title="Add a new client" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			</Stack>
			}
			 			
			{loading && <CircularProgress />}
			{!loading && clients.length === 0 && <p>No clients found</p>}

			{!loading && clients.length > 0 && (
				<TableContainer component={Paper} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="center">Nr. Transactions</TableCell>
								<TableCell align="right">username</TableCell>
								{isLoggedIn() && (
								<TableCell align="center">Operations</TableCell>
								)}
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
											{client.clientFirstName+""+client.clientLastName}
										</Link>
									</TableCell>
									<TableCell align="center">{client.transactionsCount}</TableCell>
									<TableCell align="right">
										<Link to={`/user/${client.userName}`} title="View user details">
											{client.userName}
										</Link>
									</TableCell>
									{canEdit(client.userName)&&
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.clientId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.clientId}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									
									</TableCell>
									}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			{!loading && clients.length > 0 && (
				<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", width:'100%'}}}>
					<Stack direction="column" spacing={1} alignItems="left" sx={{ width:'100%'}} >
						{clients.map((client: ClientDTO, index) => (
							<Stack bgcolor="grey.200" p={2} direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ borderRadius: '6px'}} >
								<Stack direction="column" spacing={2}   alignItems="left">
									<Typography variant="subtitle1" component="div">
										#
									</Typography>
									<Typography variant="subtitle1" component="div">
										First Name
									</Typography>
									<Typography variant="subtitle1" component="div">
										Last Name
									</Typography>
									<Typography variant="subtitle1" component="div">
										Email
									</Typography>
									<Typography variant="subtitle1" component="div">
										Phone number
									</Typography>
									<Typography variant="subtitle1" component="div">
										Transactions
									</Typography>
									<Typography variant="subtitle1" component="div">
										Username
									</Typography>
									{canEdit(client.userName) && (
										<Typography variant="subtitle1" component="div">
										Operations
										</Typography>
									)}
								</Stack>
								<Stack direction="column" spacing={2}  alignItems="right">
								<Typography variant="subtitle1" component="div">
										{index}
									</Typography>
									<Link to={`/clients/${client.clientId}/details`} title="View client details">
											{client.clientFirstName}
									</Link>
									<Typography variant="subtitle1" component="div">
										{client.clientLastName}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{client.clientEmail}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{client.clientPhoneNumber}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{client.transactionsCount}
									</Typography>
									<Link to={`/user/${client.userName}`} title="View user details">
										<Typography variant="subtitle1" component="div">
										{client.userName}
										</Typography>
									</Link>
									<Stack direction="row" spacing={0.5} alignItems="center">
									{canEdit(client.userName) && (
										<>
										<IconButton component={Link} to={`/clients/${client.clientId}/edit`} sx={{ mr: 0 }}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} to={`/clients/${client.clientId}/delete`} sx={{ mr: 0 }}>
											<DeleteForeverIcon sx={{ color: 'red' }} />
										</IconButton>
										</>
									)}
									</Stack>
								</Stack>
							</Stack>
						))}
					</Stack>
				</Box>
			)}
			<Stack direction="row" spacing={2}   alignItems="center" justifyContent="center">
				<IconButton edge="start" onClick={() => {if(pageNumber>0){setPageNumber(pageNumber-1)}}}>
					<ArrowBackIcon>Go to back clients:</ArrowBackIcon>
				</IconButton>
				<IconButton edge="start" onClick={() => {setPageNumber(pageNumber+1)}}>
					<ArrowForwardIcon>Go to next clients:</ArrowForwardIcon>
				</IconButton>
			</Stack>
		</Container>
	);
};