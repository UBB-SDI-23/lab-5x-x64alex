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
import { BACKEND_API_URL } from "../constants";
import { Product } from "../models/Product";

export const AllProducts = () => {
	const [loading, setLoading] = useState(false);
    const [products, setproducts] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/products`)
			.then((response) => response.json())
			.then((data) => {
				setproducts(data);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1>All products</h1>

			{loading && <CircularProgress />}
			{!loading && products.length === 0 && <p>No products found</p>}
			{!loading && (
				<IconButton>
					<Tooltip title="Add a new product" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && products.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">Sale</TableCell>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product: Product, index) => (
								<TableRow key={product.productId}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
											{product.productName}
									</TableCell>
									<TableCell align="right">{product.productPrice}</TableCell>
									<TableCell align="right">{product.productQuantity}</TableCell>
									<TableCell align="right">{String(product.productOnSale)}</TableCell>
									<TableCell align="right">{product.productWeight}</TableCell>
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