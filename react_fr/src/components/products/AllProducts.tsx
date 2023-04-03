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
	TableSortLabel
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import { Product } from "../../models/Product";

export const AllProducts = () => {
	const [loading, setLoading] = useState(false);
    const [products, setproducts] = useState([]);
	const [orderDirection, setOrderDirection] = useState("asc");

	const sortArray = (arr: Product[], orderBy: String) => {
		switch (orderBy) {
		  case "asc":
		  default:
			return arr.sort((a, b) =>
			  a.productPrice > b.productPrice ? 1 : b.productPrice > a.productPrice ? -1 : 0
			);
		  case "desc":
			return arr.sort((a, b) =>
			  a.productPrice < b.productPrice ? 1 : b.productPrice < a.productPrice ? -1 : 0
			);
		}
	  };

	  const handleSortRequest = () => {
		//setproducts(sortArray(products, orderDirection)!);
		setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
	  };

	const [productQuantityError, setProductQuantityError] = useState(false);
	const [productQuantityString, setProductQuantityString] = useState("");
	const [productQuantityHelper, setProductQuantityHelper] = useState("");
	const [productQuantity, setProductQuantity] = useState(-1);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/products/filterQuantityGreaterThan/${productQuantity}`)
			.then((response) => response.json())
			.then((data) => {
				setproducts(data);
				setLoading(false);
			});
	}, [productQuantity]);


	return (
		<Container>
			<h1>All products</h1>
			<Stack direction="row" spacing={2}   alignItems="center">
				<h3>Add a product:</h3>
				<IconButton component={Link} sx={{ mr: 3 }} to={`/products/add`}>
					<Tooltip title="Add a new product" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
				<h3>Filter by quantity greater than:</h3>
				<TextField value={productQuantityString} 
					error={productQuantityError} 
					id="Outlined" 
					label="Quantity" 
					variant="outlined" 
					helperText={productQuantityHelper}
					onChange={(newValue) => {
						setProductQuantityError(false);
						setProductQuantityHelper("");
						setProductQuantityString(newValue.target.value);


						var newQuantity = Number(newValue.target.value);
						if (isNaN(newQuantity) || !Number.isInteger(newQuantity)){
							setProductQuantityError(true);
							setProductQuantityHelper("The input must be an integer");
						}
						else{
							setProductQuantity(newQuantity);
						}
						if (newValue.target.value ===""){
							setProductQuantity(-1);
						}
					}}/>
				
			</Stack>
			 			
			{loading && <CircularProgress />}
			{!loading && products.length === 0 && <p>No products found</p>}

			{!loading && products.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left" onClick={handleSortRequest}>
									<TableSortLabel
										active={true}
									>
										Name
									</TableSortLabel>
			 					</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">Sale</TableCell>
                                <TableCell align="right">Weight</TableCell>
								<TableCell align="right">Category Id</TableCell>
                                <TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product: Product, index) => (
								<TableRow key={product.productId}>
									<TableCell component="th" scope="row">
										{index + 1}
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
									<TableCell align="right">{product.categoryId}</TableCell>
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