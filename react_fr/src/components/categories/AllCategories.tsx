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
import { CategoryProduct } from "../../models/Category/CategoryProduct";


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
		fetch(`${BACKEND_API_URL}/categories/averagePriceProduct?pageNumber=${pageNumber}&pageSize=${pageSize}`)
			.then((response) => response.json())
			.then((data) => {
				setCategory(data);
				setLoading(false);
			});
	}, [productQuantity, pageNumber, sortByQuantityDescending]);

	const [loading, setLoading] = useState(false);
    const [categories, setCategory] = useState<CategoryProduct[]>([]);

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
				<IconButton edge="start" onClick={() => {if(categories.length == pageSize){setPageNumber(pageNumber+1)}}}>
        			<ArrowForwardIcon>Go to next categories:</ArrowForwardIcon>
      			</IconButton>
			</Stack>
			 			
			{loading && <CircularProgress />}
			{!loading && categories.length === 0 && <p>No categories found</p>}

			{!loading && categories.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="right">Popularity</TableCell>
								<TableCell align="right">Sales</TableCell>
								<TableCell align="right">ReturnsPerMonth</TableCell>
								<TableCell align="right">Profitability</TableCell>
								<TableCell align="right">Products</TableCell>
								<TableCell align="right">Avg Product price</TableCell>
                                <TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{categories.map((category: CategoryProduct, index) => (
								<TableRow key={category.categoryId}>
									<TableCell component="th" scope="row">
										{pageNumber*pageSize+index+1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/category/${category.categoryId}/details`} title="View category details">
											{category.categoryName}
										</Link>
									</TableCell>
									<TableCell component="th" scope="row">{category.categoryName}</TableCell>
									<TableCell align="right">{category.categoryPopularity}</TableCell>
									<TableCell align="right">{category.categorySales}</TableCell>
									<TableCell align="right">{category.categoryReturnsPerMonth}</TableCell>
									<TableCell align="right">{category.categoryProfitability}</TableCell>
									<TableCell align="right">{category.categoryNumberProducts}</TableCell>
									<TableCell align="right">{category.categoryAveragePrice}</TableCell>
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/${category.categoryId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/${category.categoryId}/delete`}>
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