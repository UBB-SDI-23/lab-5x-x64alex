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
    Card,
    CardContent,
    Button,
    CardActions,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProductTransactions } from "../../models/Product/ProductTransactions";
import { Category } from "../../models/Category/Category";
import axios from "axios";

export const CategoryAdd = () => {
	const navigate = useNavigate();

	const [category, setCategory] = useState<Category>({
	    categoryName:"",
        categoryPopularity: 0,
        categorySales: 0,
        categoryReturnsPerMonth: 0,
        categoryProfitability: 0
	});

	const addCategory = (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			axios.post(`${BACKEND_API_URL}/categories`, category);
			alert("Product added")
			navigate("/categories");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={addCategory}>
						<TextField
                            type="string"
							id="name"
							label="Product Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryName = newValue.target.value}
						/>


						<Button id = "submitButton" type="submit">Add Category</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};