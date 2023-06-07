import { Card, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Category } from "../../models/Category/Category";

export const CategoryDetails = () => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<Category>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/categories/${categoryId}`);
			const data = await response.json();
			setCategory(data);

		};
		fetchProduct();
	}, [categoryId]);

	return (
		<Container>
			<Card>
				<CardContent>
				<Stack  spacing={2}   alignItems="left">
					<Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						<h1>Category Details</h1>
					</Stack>
					<p>Category Name: {category?.categoryName}</p>
					<p>Category Popularity: {category?.categoryPopularity}</p>
					<p>Category Profitability: {category?.categoryProfitability}</p>
					<p>Category ReturnsPerMonth: {category?.categoryReturnsPerMonth}</p>
					<p>Category Sales: {category?.categorySales}</p>
				</Stack>
				</CardContent>
			</Card>
		</Container>
	);
	
};