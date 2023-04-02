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
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Client } from "../models/Client";
import { BACKEND_API_URL } from "../constants";

export const Allclients = () => {
	const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/clients`)
			.then((response) => response.json())
			.then((data) => {
				setClients(data);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1>All clients</h1>

			{loading && <CircularProgress />}
			{!loading && clients.length === 0 && <p>No clients found</p>}
			{!loading && clients.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Address</TableCell>
								<TableCell align="center">Phone</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients.map((client: Client, index) => (
								<TableRow key={client.clientId}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
											{client.clientFirstName}
									</TableCell>
									<TableCell align="right">{client.clientEmail}</TableCell>
									<TableCell align="right">{client.clientAddress}</TableCell>
									<TableCell align="right">
										<IconButton>
											<EditIcon />
										</IconButton>

										<IconButton>
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