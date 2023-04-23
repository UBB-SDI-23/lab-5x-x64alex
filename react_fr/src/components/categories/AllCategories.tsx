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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProductTransactions } from "../../models/Product/ProductTransactions";


export const AllCategories = () => {

	const [productQuantityError, setProductQuantityError] = useState(false);
	const [productQuantityString, setProductQuantityString] = useState("");
	const [productQuantityHelper, setProductQuantityHelper] = useState("");
	const [productQuantity, setProductQuantity] = useState(-1);


	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(50);

	const [sortByQuantityDescending, setSortByQuantityDescending] = useState(0);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/categories/pageNumber=${pageNumber}&pageSize=${pageSize}`)
			.then((response) => response.json())
			.then((data) => {
				setproducts(data);
				setLoading(false);
			});
	}, [productQuantity, pageNumber, sortByQuantityDescending]);

	const [loading, setLoading] = useState(false);
    const [products, setproducts] = useState<ProductTransactions[]>([]);

	type arrowDirectionType = "asc" | "desc"


	const [orderDirectionQuantity, setOrderDirectionQuantity] = useState<arrowDirectionType>("asc");

	const handleSortRequestQuantity = () => {
		setSortByQuantityDescending(sortByQuantityDescending === 0 ? 1 : 0);
		setOrderDirectionQuantity(orderDirectionQuantity === "asc" ? "desc" : "asc");
	};
	return (
		<Container>
			<h1>All categories</h1>
			<Stack direction="row" spacing={2}   alignItems="center">
				<h3>Add a category:</h3>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/add`}>
					<Tooltip title="Add a new category" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
				<IconButton edge="start" onClick={() => {if(pageNumber>0){setPageNumber(pageNumber-1)}}}>
        			<ArrowBackIcon>Go to back categories:</ArrowBackIcon>
      			</IconButton>
				<IconButton edge="start" onClick={() => {if(products.length == pageSize){setPageNumber(pageNumber+1)}}}>
        			<ArrowForwardIcon>Go to next categories:</ArrowForwardIcon>
      			</IconButton>
			</Stack>
			 			
			{loading && <CircularProgress />}
			{!loading && products.length === 0 && <p>No categories found</p>}

			{!loading && products.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="right">Popularity</TableCell>
								<TableCell align="right">Sales</TableCell>
								<TableCell align="right">ReturnsPerMonth</TableCell>
								<TableCell align="center">Profitability</TableCell>
                                <TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product: ProductTransactions, index) => (
								<TableRow key={product.productId}>
									<TableCell component="th" scope="row">
										{pageNumber*pageSize+index+1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/products/${product.productId}/details`} title="View product details">
											{product.productName}
										</Link>
									</TableCell>
									<TableCell align="right">{product.productPrice}</TableCell>
									<TableCell align="right">{product.productQuantity}</TableCell>
									<TableCell align="right">{String(product.productOnSale)}</TableCell>
									<TableCell align="right">{product.productWeight}</TableCell>
									<TableCell align="right">{product.transactionsCount}</TableCell>
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/products/${product.productId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/products/${product.productId}/delete`}>
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