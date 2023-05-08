import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL, config } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Category } from "../../models/Category/Category";

export const CategoryUpdate = () => {
    const { categoryId } = useParams();

    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState<String>("");
    const [categoryPopularity, setCategoryPopularity] = useState<Number>(0);
    const [categoryProfitability, setCategoryProfitability] = useState<Number>(0);
    const [categoryReturnsPerMonth, setCategoryReturnsPerMonth] = useState<Number>(0);
    const [categorySales, setCategorySales] = useState<Number>(0);

	const [category, setCategory] = useState<Category>({
	    categoryName:"",
        categoryPopularity: 0,
        categorySales: 0,
        categoryReturnsPerMonth: 0,
        categoryProfitability: 0
	});

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/categories/${categoryId}`, config());
			const data = await response.json();
            setCategoryName(data.categoryName);
            setCategoryPopularity(data.categoryProfitability)
            setCategoryProfitability(data.categoryProfitability)
            setCategoryReturnsPerMonth(data.categoryReturnsPerMonth)
            setCategorySales(data.categorySales)
			setCategory(data);

		};
		fetchProduct();
	}, [categoryId]);

    const updateProduct = async (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			await axios.put(`${BACKEND_API_URL}/categories/${categoryId}`, category);
			alert("Category updated")
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

					<form onSubmit={updateProduct}>
						<TextField
                            value={categoryName} 
                            type="string"
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {category.categoryName = newValue.target.value; setCategoryName(category.categoryName);}}
						/>
                        <TextField
                            value={categoryPopularity} 
                            type="number"
							id="name"
							label="Popularity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {category.categoryPopularity = Number(newValue.target.value); setCategoryPopularity(category.categoryPopularity);}}
						/>
                        <TextField
                            value={categoryProfitability} 
                            type="number"
							id="name"
							label="Profitability"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {category.categoryProfitability = Number(newValue.target.value); setCategoryProfitability(category.categoryProfitability);}}
                        />
                        <TextField
                            value={categoryReturnsPerMonth} 
                            type="number"
							id="name"
							label="ReturnsPerMonth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {category.categoryReturnsPerMonth = Number(newValue.target.value); setCategoryReturnsPerMonth(category.categoryReturnsPerMonth);}}
                        />
                        <TextField
                            value={categorySales} 
                            type="number"
							id="name"
							label="Sales"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {category.categorySales = Number(newValue.target.value); setCategorySales(category.categorySales);}}
						/>

						<Button id = "submitButton" type="submit">Update Category</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};