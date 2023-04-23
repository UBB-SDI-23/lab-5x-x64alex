import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Product } from "../../models/Product/Product";
import { ProductCategory } from "../../models/Product/ProductDetails";
import { CategoryName } from "../../models/Category/CategoryName";
import { Category } from "../../models/Category/Category";

export const CategoryUpdate = () => {
    const { categoryId } = useParams();

    const navigate = useNavigate();

	const [category, setCategory] = useState<Category>({
	    categoryName:"",
        categoryPopularity: 0,
        categorySales: 0,
        categoryReturnsPerMonth: 0,
        categoryProfitability: 0
	});

    const updateProduct = async (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			await axios.put(`${BACKEND_API_URL}/categories/${categoryId}`, category);
			alert("Product updated")
			navigate("/products");
		} catch (error) {
			alert(error);
		}
	};
    useEffect(() => {

		const fetchProduct = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/categories/${categoryId}`)
                .then(response => response.json())
                .then(response => {

                console.log(response)
                category.categoryName = response.categoryName
                category.categoryPopularity = response.categoryPopularity
                category.categorySales = response.categorySales
                category.categoryReturnsPerMonth = response.categoryReturnsPerMonth
                category.categoryProfitability = response.categoryProfitability
            });
            
		};
		fetchProduct();
	},[]);

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={updateProduct}>
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