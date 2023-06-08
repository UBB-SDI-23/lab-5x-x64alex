import {
	Container,
	IconButton,
	TextField,
	Stack,
    Card,
    CardContent,
    Button,
    CardActions,
	FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL, authorization } from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Category } from "../../models/Category/Category";
import axios from "axios";

export const CategoryAdd = () => {
	const navigate = useNavigate();
	const [validationError, setValidationError] = useState(false);
	const [firstSubmit, setFirstSubmit] = useState(false);


	const config = {
			headers: {
			  Authorization: authorization,
			  'Content-Type': 'application/json'
			}
	};
	const [category, setCategory] = useState<Category>({
	    categoryName:"",
        categoryPopularity: -1000,
        categorySales: -1000,
        categoryReturnsPerMonth: -1000,
        categoryProfitability: -1000
	});

	const addCategory = (event: { preventDefault: () => void }) => {
		setFirstSubmit(true);
		event.preventDefault();
		if(category.categoryName === "" || category.categoryPopularity === -1000 || category.categorySales === -1000 || category.categoryReturnsPerMonth === -1000 || category.categoryProfitability ===-1000)
		{
			//alert("Error: all textfileds must not be empty")
			setValidationError(true)
		}
		else{
			try {
				axios.post(`${BACKEND_API_URL}/categories`, category, config);
				alert("Product added")
				navigate("/categories");
			} catch (error) {
				alert(error);
			}
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
							id="categoryName"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryName = newValue.target.value}
							error={firstSubmit && category.categoryName===""}
						/>
                        <TextField
                            type="number"
							id="categoryPopularity"
							label="Popularity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryPopularity = Number(newValue.target.value)}
							error={firstSubmit && category.categoryPopularity===-1000}
						/>
                        <TextField
                            type="number"
							id="categoryProfitability"
							label="Profitability"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryProfitability = Number(newValue.target.value)}
							error={(firstSubmit && category.categorySales === -1000) || (!firstSubmit && category.categorySales !== -1000)}
							/>
                        <TextField
                            type="number"
							id="categoryReturnsPerMonth"
							label="ReturnsPerMonth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categoryReturnsPerMonth = Number(newValue.target.value)}
							error={firstSubmit && category.categoryReturnsPerMonth===-1000}
                        />
                        <TextField
                            type="number"
							id="categorySales"
							label="Sales"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => category.categorySales = Number(newValue.target.value)}
							error={category.categorySales===-1000}
						/>
						{validationError && (
        					<FormHelperText error>Fields cannot be empty</FormHelperText>
      					)}

						<Button id = "submitButton" type="submit">Add Category</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};