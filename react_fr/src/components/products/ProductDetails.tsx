import { Card, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ProductCategory } from "../../models/Product/ProductDetails";

export const ProductDetails = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState<ProductCategory>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/products/${productId}`);
			const product = await response.json();
			setProduct(product);

		};
		fetchProduct();
	}, [productId]);

	return (
		<Container>
			<Card>
				<CardContent>
				<Stack  spacing={2}   alignItems="left">
					<Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/products`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						<h1>Product Details</h1>

					</Stack>
					<p>Product Name: {product?.productName}</p>
					<p>Product Price: {product?.productPrice}</p>
					<p>Product Quantity: {product?.productQuantity}</p>
					<p>Product Sale: {String(product?.productOnSale)}</p>
					<p>Product Weight: {product?.productWeight}</p>
					<p>Product Description: {product?.productDescription}</p>
					<p>Product category:</p>
					<ul>
						<li>Category name:{product?.categoryDTO.categoryName}</li>
						<li>Category popularity{product?.categoryDTO.categoryPopularity}</li>
						<li>Category profitability:{product?.categoryDTO.categoryProfitability}</li>
						<li>Category returns per month:{product?.categoryDTO.categoryReturnsPerMonth}</li>
						<li>Category sales:{product?.categoryDTO.categorySales}</li>
					</ul>
				</Stack>

			


				</CardContent>
			</Card>
		</Container>
	);
};
