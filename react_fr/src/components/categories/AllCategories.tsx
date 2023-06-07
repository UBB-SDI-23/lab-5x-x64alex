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
	Stack,
	Pagination,
	Box,
	Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL, canAdd, canEdit, isLoggedIn } from "../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CategoryProduct } from "../../models/Category/CategoryProduct";


export const AllCategories = () => {

	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(50);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/categories/averagePriceProduct?pageNumber=${pageNumber}`)
			.then((response) => response.json())
			.then((data) => {
				setCategory(data);
				setLoading(false);
			});
	}, [pageNumber]);

	const [loading, setLoading] = useState(false);
    const [categories, setCategory] = useState<CategoryProduct[]>([]);

	return (
		<Container>
			<h1>All categories</h1>
			{canAdd()&&
			<Stack direction="row" spacing={2}   alignItems="center">
				<h3>Add a category:</h3>
				<IconButton component={Link}id="addButton" sx={{ mr: 3 }} to={`/categories/add`}>
					<Tooltip title="Add a new category" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			</Stack>
			}
			 			
			{loading && <CircularProgress />}
			{!loading && categories.length === 0 && <p>No categories found</p>}

			{!loading && categories.length > 0 && (
				<TableContainer component={Paper} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table" >
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="right">Popularity</TableCell>
								<TableCell align="right">Sales</TableCell>
								<TableCell align="right">ReturnsPerMonth</TableCell>
								<TableCell align="right">Profitability</TableCell>
								<TableCell align="right">Nr Products</TableCell>
								<TableCell align="right">Avg Product price</TableCell>
								<TableCell align="right">username</TableCell>
								{isLoggedIn() && (

                                <TableCell align="center">Operations</TableCell>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{categories.map((category: CategoryProduct, index) => (
								<TableRow key={category.categoryId}>
									<TableCell component="th" scope="row">
										{pageNumber*pageSize+index+1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/categories/${category.categoryId}/details`} title="View category details">
											{category.categoryName}
										</Link>
									</TableCell>
									<TableCell align="right">{category.categoryPopularity}</TableCell>
									<TableCell align="right">{category.categoryNumberProducts}</TableCell>
									<TableCell align="right">{category.categoryAveragePrice}</TableCell>
									<TableCell align="right">
										<Link to={`/user/${category.userName}`} title="View user details">
											{category.userName}
										</Link>
									</TableCell>
									{canEdit(category.userName)&&
									<TableCell align="right">
										<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/${category.categoryId}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/categories/${category.categoryId}/delete`}>
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
			{!loading && categories.length > 0 && (
				<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", width:'100%'}}}>
					<Stack direction="column" spacing={1} alignItems="left" sx={{ width:'100%'}} >
						{categories.map((category: CategoryProduct, index) => (
							<Stack bgcolor="grey.200" p={2} direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ borderRadius: '6px'}} >
								<Stack direction="column" spacing={2}   alignItems="left">
									<Typography variant="subtitle1" component="div">
										#
									</Typography>
									<Typography variant="subtitle1" component="div">
										Name
									</Typography>
									<Typography variant="subtitle1" component="div">
										Popularity
									</Typography>
									<Typography variant="subtitle1" component="div">
										Nr Products
									</Typography>
									<Typography variant="subtitle1" component="div">
										Avg Product price
									</Typography>
									<Typography variant="subtitle1" component="div">
										Username
									</Typography>
									{canEdit(category.userName) && (
										<Typography variant="subtitle1" component="div">
										Operations
										</Typography>
									)}
								</Stack>
								<Stack direction="column" spacing={2}  alignItems="right">
								<Typography variant="subtitle1" component="div">
										{index}
									</Typography>
									<Link to={`/categories/${category.categoryId}/details`} title="View category details">
											{category.categoryName}
									</Link>
									<Typography variant="subtitle1" component="div">
										{category.categoryPopularity}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{String(category.categorySales)}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{category.categoryReturnsPerMonth}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{category.categoryProfitability}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{category.categoryNumberProducts}
									</Typography>
									<Typography variant="subtitle1" component="div">
										{category.categoryAveragePrice}
									</Typography>
									<Link to={`/user/${category.userName}`} title="View user details">
										<Typography variant="subtitle1" component="div">
										{category.userName}
										</Typography>
									</Link>
									<Stack direction="row" spacing={0.5} alignItems="center">
									{canEdit(category.userName) && (
										<>
										<IconButton component={Link} to={`/categories/${category.categoryId}/edit`} sx={{ mr: 0 }}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} to={`/categories/${category.categoryId}/delete`} sx={{ mr: 0 }}>
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
					<ArrowBackIcon>Go to back categories:</ArrowBackIcon>
				</IconButton>
				<IconButton edge="start" onClick={() => {setPageNumber(pageNumber+1)}}>
					<ArrowForwardIcon>Go to next categories:</ArrowForwardIcon>
				</IconButton>
			</Stack>
		</Container>
	);
};