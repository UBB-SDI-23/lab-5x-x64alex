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
import { BACKEND_API_URL, canAdd, canEdit } from "../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClientDTO } from "../../models/Client/ClientDTO";
import { TransactionAvgClientOrderQuantity } from "../../models/Transaction/TransactionAvgClientOrderQuantity";

export const AllTransactions = () => {
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(50);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/transactions?pageNumber=${pageNumber}&pageSize=${pageSize}`)
			.then((response) => response.json())
			.then((data) => {
				setTransaction(data);
				setLoading(false);
			});
	}, [pageNumber]);

	const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState<TransactionAvgClientOrderQuantity[]>([]);

	return (
		<Container>
			<h1>All transactions</h1>
			{canAdd()&&
			<Stack direction="row" spacing={2}   alignItems="center">
				<h3>Add a transaction:</h3>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/transactions/add`}>
					<Tooltip title="Add a new transaction" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			</Stack>
			}
			 			
			{loading && <CircularProgress />}
			{!loading && transaction.length === 0 && <p>No transactions found</p>}

			{!loading && transaction.length > 0 && (
				<TableContainer component={Paper} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Date</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">Average Client order quantity</TableCell>
								<TableCell align="right">username</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transaction.map((transaction: TransactionAvgClientOrderQuantity, index) => (
								<TableRow key={transaction.transactionId}>
									<TableCell component="th" scope="row">
										{pageNumber*pageSize+index+1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/transactions/${transaction.transactionId}/details`} title="View client details">
											{new Date(transaction.transactionDate).toLocaleDateString()}
										</Link>
									</TableCell>
									<TableCell align="right">{transaction.transactionQuantity}</TableCell>
									<TableCell align="right">{transaction.avgClientOrderQuantity}</TableCell>
									<TableCell align="right">
										<Link to={`/user/${transaction.userName}`} title="View user details">
											{transaction.userName}
										</Link>
									</TableCell>
									{canEdit(transaction.userName)&&
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/transactions/${transaction.transactionId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/transactions/${transaction.transactionId}/delete`}>
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
			{!loading && transaction.length > 0 && (
				<Box sx={{ display: { xs: "flex", md: "none", width:'100%'}}}>
					<Stack direction="column" spacing={1} alignItems="left" sx={{ width:'100%'}} >
						{transaction.map((transaction: TransactionAvgClientOrderQuantity, index) => (
							<Stack bgcolor="grey.200" p={2} direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ borderRadius: '6px'}} >
								<Stack direction="column" spacing={2}   alignItems="left">
									<Typography variant="subtitle1" component="div">
										#
									</Typography>
									<Typography variant="subtitle1" component="div">
										Date
									</Typography>
									<Typography variant="subtitle1" component="div">
										Quantity
									</Typography>
									<Typography variant="subtitle1" component="div">
										Average Client order quantity
									</Typography>
									<Typography variant="subtitle1" component="div">
										Username
									</Typography>
									{canEdit(transaction.userName) && (
										<Typography variant="subtitle1" component="div">
										Operations
										</Typography>
									)}
								</Stack>
								<Stack direction="column" spacing={2}  alignItems="right">
									<Typography variant="subtitle1" component="div">
										{index}
									</Typography>
									<Link to={`/transactions/${transaction.transactionId}/details`} title="View client details">
											{new Date(transaction.transactionDate).toLocaleDateString()}
									</Link>
									<Typography variant="subtitle1" component="div">
										{transaction.transactionQuantity}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{transaction.avgClientOrderQuantity}
									</Typography>
									<Link to={`/user/${transaction.userName}`} title="View user details">
										<Typography variant="subtitle1" component="div">
										{transaction.userName}
										</Typography>
									</Link>
									<Stack direction="row" spacing={0.5} alignItems="center">
									{canEdit(transaction.userName) && (
										<>
										<IconButton component={Link} to={`/transactions/${transaction.transactionId}/edit`} sx={{ mr: 0 }}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} to={`/transactions/${transaction.transactionId}/delete`} sx={{ mr: 0 }}>
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
						<ArrowBackIcon>Go to back transactions:</ArrowBackIcon>
				</IconButton>
				<IconButton edge="start" onClick={() => {setPageNumber(pageNumber+1)}}>
						<ArrowForwardIcon>Go to next transactions:</ArrowForwardIcon>
				</IconButton>
			</Stack>
		</Container>
	);
};