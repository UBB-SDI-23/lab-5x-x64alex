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
import { Product } from "../../models/Product/Product";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const AllCategories = () => {

	const [productQuantityError, setProductQuantityError] = useState(false);
	const [productQuantityString, setProductQuantityString] = useState("");
	const [productQuantityHelper, setProductQuantityHelper] = useState("");
	const [productQuantity, setProductQuantity] = useState(-1);


	const [startIndex, setStartIndex] = useState(1);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/products/filterQuantityGreaterThan100/${productQuantity}?startId=${startIndex}&endId=${startIndex+50}`)
			.then((response) => response.json())
			.then((data) => {
				setproducts(data);
				setLoading(false);
			});
	}, [productQuantity, startIndex]);

	const [loading, setLoading] = useState(false);
    const [products, setproducts] = useState<Product[]>([]);

	type arrowDirectionType = "asc" | "desc"

	const [orderDirectionName, setOrderDirectionName] = useState<arrowDirectionType>("asc");
	const sortArrayName = (arr: Product[], orderBy: String) => {
		switch (orderBy) {
		  case "asc":
		  default:
			return arr.sort((a, b) =>
			  a.productName > b.productName ? 1 : b.productName > a.productName ? -1 : 0
			);
		  case "desc":
			return arr.sort((a, b) =>
			  a.productName < b.productName ? 1 : b.productName < a.productName ? -1 : 0
			);
		}
	};
	const handleSortRequestName = () => {
		setproducts(sortArrayName(products, orderDirectionName)!);
		setOrderDirectionName(orderDirectionName === "asc" ? "desc" : "asc");
	};

	const [orderDirectionPrice, setOrderDirectionPrice] = useState<arrowDirectionType>("asc");
	const sortArrayPrice = (arr: Product[], orderBy: String) => {
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
	const handleSortRequestPrice = () => {
		setproducts(sortArrayPrice(products, orderDirectionPrice)!);
		setOrderDirectionPrice(orderDirectionPrice === "asc" ? "desc" : "asc");
	};

	const [orderDirectionQuantity, setOrderDirectionQuantity] = useState<arrowDirectionType>("asc");
	const sortArrayQuantity = (arr: Product[], orderBy: String) => {
		switch (orderBy) {
		  case "asc":
		  default:
			return arr.sort((a, b) =>
			  a.productQuantity > b.productQuantity ? 1 : b.productQuantity > a.productQuantity ? -1 : 0
			);
		  case "desc":
			return arr.sort((a, b) =>
			  a.productQuantity < b.productQuantity ? 1 : b.productQuantity < a.productQuantity ? -1 : 0
			);
		}
	};
	const handleSortRequestQuantity = () => {
		setproducts(sortArrayQuantity(products, orderDirectionQuantity)!);
		setOrderDirectionQuantity(orderDirectionQuantity === "asc" ? "desc" : "asc");
	};

	const [orderDirectionOnSale, setOrderDirectionOnSale] = useState<arrowDirectionType>("asc");
	const sortArrayOnSale = (arr: Product[], orderBy: String) => {
		switch (orderBy) {
		  case "asc":
		  default:
			return arr.sort((a, b) =>
			  a.productOnSale > b.productOnSale ? 1 : b.productOnSale > a.productOnSale ? -1 : 0
			);
		  case "desc":
			return arr.sort((a, b) =>
			  a.productOnSale < b.productOnSale ? 1 : b.productOnSale < a.productOnSale ? -1 : 0
			);
		}
	};
	const handleSortRequestOnSale = () => {
		setproducts(sortArrayOnSale(products, orderDirectionOnSale)!);
		setOrderDirectionOnSale(orderDirectionOnSale === "asc" ? "desc" : "asc");
	};

	const [orderDirectionWeight, setOrderDirectionWeight] = useState<arrowDirectionType>("asc");
	const sortArrayWeight = (arr: Product[], orderBy: String) => {
		switch (orderBy) {
		  case "asc":
		  default:
			return arr.sort((a, b) =>
			  a.productWeight > b.productWeight ? 1 : b.productWeight > a.productWeight ? -1 : 0
			);
		  case "desc":
			return arr.sort((a, b) =>
			  a.productWeight < b.productWeight ? 1 : b.productWeight < a.productWeight ? -1 : 0
			);
		}
	};
	const handleSortRequestWeight = () => {
		setproducts(sortArrayWeight(products, orderDirectionWeight)!);
		setOrderDirectionWeight(orderDirectionWeight === "asc" ? "desc" : "asc");
	};
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
				<IconButton edge="start" onClick={() => {setStartIndex(startIndex+50)}}>
        			<ArrowForwardIcon>Go to next products:</ArrowForwardIcon>
      			</IconButton>
			</Stack>
			 			
			{loading && <CircularProgress />}
			{!loading && products.length === 0 && <p>No products found</p>}

			{!loading && products.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left" onClick={handleSortRequestName}>
									<TableSortLabel active={true} direction={orderDirectionName}>
										Name
									</TableSortLabel>
			 					</TableCell>
								<TableCell align="right" onClick={handleSortRequestPrice}>
									<TableSortLabel active={true} direction={orderDirectionPrice}>
										Price
									</TableSortLabel>
								</TableCell>
								<TableCell align="right" onClick={handleSortRequestQuantity}>
									<TableSortLabel active={true} direction={orderDirectionQuantity}>
									Quantity
									</TableSortLabel>
								</TableCell>
								<TableCell align="right" onClick={handleSortRequestOnSale}>
									<TableSortLabel active={true} direction={orderDirectionOnSale}>
									Sale
									</TableSortLabel>
								</TableCell>
								<TableCell align="right" onClick={handleSortRequestWeight}>
									<TableSortLabel active={true} direction={orderDirectionWeight}>
									Weight
									</TableSortLabel>
								</TableCell>
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