import {
	Container,
	IconButton,
	TextField,
	Stack,
    Card,
    CardContent,
    Button,
    CardActions,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL, config } from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
			axios.post(`${BACKEND_API_URL}/categories`, category, config());
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
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryName = newValue.target.value}
						/>
                        <TextField
                            type="number"
							id="name"
							label="Popularity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryPopularity = Number(newValue.target.value)}
						/>
                        <TextField
                            type="number"
							id="name"
							label="Profitability"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryProfitability = Number(newValue.target.value)}
                        />
                        <TextField
                            type="number"
							id="name"
							label="ReturnsPerMonth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryReturnsPerMonth = Number(newValue.target.value)}
                        />
                        <TextField
                            type="number"
							id="name"
							label="Sales"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categorySales = Number(newValue.target.value)}
						/>

						<Button id = "submitButton" type="submit">Add Category</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};