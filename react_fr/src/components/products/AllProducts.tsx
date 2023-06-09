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
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL, canAdd, canEdit, isLoggedIn } from "../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { ProductTransactions } from "../../models/Product/ProductTransactions";


export const AllProducts = () => {

	const [productQuantityError, setProductQuantityError] = useState(false);
	const [productQuantityString, setProductQuantityString] = useState("");
	const [productQuantityHelper, setProductQuantityHelper] = useState("");
	const [productQuantity, setProductQuantity] = useState(-1);


	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(50);

	const [sortByQuantityDescending, setSortByQuantityDescending] = useState(0);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/products/filterQuantityGreaterThanPageable/${productQuantity}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortByQuantityDescending=${sortByQuantityDescending}`)
			.then((response) => response.json())
			.then((data) => {
				setproducts(data);
				setPageSize(products.length)
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
			<h1>All products</h1>
			<Stack direction="column" spacing={1}  alignItems="left">
				{canAdd()&&
					<Stack direction="row" spacing={2} alignItems="center">
						<h3>Add a product:</h3>
						<IconButton id="addButton" component={Link} sx={{ mr: 3 }} to={`/products/add`}>
							<Tooltip title="Add a new product" arrow>
								<AddIcon color="primary" />
							</Tooltip>
						</IconButton>
					</Stack>
				}
				<h3>Filter by quantity greater than:</h3>
				<TextField value={productQuantityString}
					sx={{ width: '100%' }} 
					error={productQuantityError} 
					id="filterQuantity" 
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
				<TableContainer component={Paper} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right" onClick={handleSortRequestQuantity}>
									<TableSortLabel active={true} direction={orderDirectionQuantity}>
									Quantity
									</TableSortLabel>
								</TableCell>
								<TableCell align="right">username</TableCell>
								{isLoggedIn() && (
                                <TableCell align="center">Operations</TableCell>
								)}
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
									<TableCell align="right">
										<Link to={`/user/${product.userName}`} title="View user details">
											{product.userName}
										</Link>
									</TableCell>
									{canEdit(product.userName)&&
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/products/${product.productId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/products/${product.productId}/delete`}>
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
			{!loading && products.length > 0 && (
				<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", width:'100%'}}}>
					<Stack direction="column" spacing={1} alignItems="left" sx={{ width:'100%'}} >
						{products.map((product: ProductTransactions, index) => (
							<Stack bgcolor="grey.200" p={2} direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ borderRadius: '6px'}} >
								<Stack direction="column" spacing={2}   alignItems="left">
									<Typography variant="subtitle1" component="div">
										#
									</Typography>
									<Typography variant="subtitle1" component="div">
										Name
									</Typography>
									<Typography variant="subtitle1" component="div">
										Price
									</Typography>
									<Typography variant="subtitle1" component="div">
										Quantity
									</Typography>
									<Typography variant="subtitle1" component="div">
										Sale
									</Typography>
									<Typography variant="subtitle1" component="div">
										Weight
									</Typography>
									<Typography variant="subtitle1" component="div">
										Nr. Transactions
									</Typography>
									<Typography variant="subtitle1" component="div">
										Username
									</Typography>
									{canEdit(product.userName) && (
										<Typography variant="subtitle1" component="div">
										Operations
										</Typography>
									)}
								</Stack>
								<Stack direction="column" spacing={2}  alignItems="right">
								<Typography variant="subtitle1" component="div">
										{index}
									</Typography>
									<Link to={`/products/${product.productId}/details`} title="View product details">
											{product.productName}
									</Link>
									<Typography variant="subtitle1" component="div">
										{product.productPrice}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{product.productQuantity}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{String(product.productOnSale)}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{product.productWeight}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{product.transactionsCount}
									</Typography>
									<Link to={`/user/${product.userName}`} title="View user details">
										<Typography variant="subtitle1" component="div">
										{product.userName}
										</Typography>
									</Link>
									<Stack direction="row" spacing={0.5} alignItems="center">
									{canEdit(product.userName) && (
										<>
										<IconButton component={Link} to={`/products/${product.productId}/edit`} sx={{ mr: 0 }}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} to={`/products/${product.productId}/delete`} sx={{ mr: 0 }}>
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
					<ArrowBackIcon>Go to next products:</ArrowBackIcon>
				</IconButton>
				<IconButton edge="start" onClick={() => {setPageNumber(pageNumber+1)}}>
					<ArrowForwardIcon>Go to next products:</ArrowForwardIcon>
				</IconButton>
			</Stack>

		</Container>
	);
};