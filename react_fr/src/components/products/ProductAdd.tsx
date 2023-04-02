// @ts-nocheck

import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Product } from "../../models/Product";

export const ProductAdd = () => {
	const navigate = useNavigate();

	const [product, setProduct] = useState<Product>({
	    productName: "Dumbbell",
    	productPrice: Number,
    	productQuantity: 2,
    	productOnSale: false,
    	productWeight: 2,
    	categoryId: 1,
	});

	const [productPriceError, setProductPriceError] = useState(false);
	const [productPriceString, setProductPriceString] = useState<String>("");
	const [productPriceHelper, setProductPriceHelper] = useState("");
	const checkNewPrice = (newValue: String) => {
		setProductPriceError(false);
		setProductPriceHelper("");
		setProductPriceString(newValue);

		var newPrice = Number(newValue);
		if(newValue = "") {
			setProductPriceError(true);
			setProductPriceHelper("The input must not be empty");
			return false;
		}
		if (isNaN(newPrice)){
			setProductPriceError(true);
			setProductPriceHelper("The input must be a number");
			return false;
		}
		else{
			product.productPrice = newPrice;
			return true;
		}

	}

	const [productQuantityError, setProductQuantityError] = useState(false);
	const [productQuantityString, setProductQuantityString] = useState<String>("");
	const [productQuantityHelper, setProductQuantityHelper] = useState("");
	const checkNewQuantity = (newValue: String) => {
		setProductQuantityError(false);
		setProductQuantityHelper("");
		setProductQuantityString(newValue);

		var newQuantity = Number(newValue);
		if (isNaN(newQuantity) || !Number.isInteger(newQuantity)){
			setProductQuantityError(true);
			setProductQuantityHelper("The input must be an integer");
			return false;
		}
		else{
			product.productQuantity = newQuantity;
			return true;
		}

	}

	const [productCategoryIdError, setProductCategoryIdError] = useState(false);
	const [productCategoryIdString, setProductCategoryIdString] = useState<String>("");
	const [productCategoryIdHelper, setProductCategoryIdHelper] = useState("");
	const checkNewCategoryId = (newValue: String) => {
		setProductCategoryIdError(false);
		setProductCategoryIdHelper("");
		setProductCategoryIdString(newValue);

		var newCategoryId = Number(newValue);
		if (isNaN(newCategoryId) || !Number.isInteger(newCategoryId)){
			setProductCategoryIdError(true);
			setProductCategoryIdHelper("The input must be an integer");
			return false;
		}
		else{
			product.categoryId = newCategoryId;
			return true;
		}

	}



	const addProduct = async (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/products/`, product);
			navigate("/products");
		} catch (error) {
			setProductCategoryIdError(true);
			setProductCategoryIdHelper("Category id doesn't exist");
			console.log(error.response.data);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/products`} >
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addProduct}>
						<TextField
							id="name"
							label="Product Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setProduct({ ...product, productName: event.target.value })}
						/>
						<TextField 
							value={productPriceString} 
							error={productPriceError} 
							label="Product Price"
							variant="outlined" 
							fullWidth
							sx={{ mb: 2 }}
							helperText={productPriceHelper}
							onChange={(newValue) => {
								checkNewPrice(newValue.target.value)
							}}/>
						<TextField 
							value={productQuantityString} 
							error={productQuantityError} 
							label="Product Quantity"
							variant="outlined" 
							fullWidth
							sx={{ mb: 2 }}
							helperText={productQuantityHelper}
							onChange={(newValue) => {
								checkNewQuantity(newValue.target.value)
							}}/>
						<TextField
							id="onSale"
							label="OnSale"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setProduct({ ...product, productOnSale: Boolean(event.target.value) })}
						/>
						<TextField
							id="name"
							label="Product Weight"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setProduct({ ...product, productName: event.target.value })}
						/>
						<TextField 
							value={productCategoryIdString} 
							error={productCategoryIdError} 
							label="Product CategoryId"
							variant="outlined" 
							fullWidth
							sx={{ mb: 2 }}
							helperText={productCategoryIdHelper}
							onChange={(newValue) => {
								checkNewCategoryId(newValue.target.value)
							}}/>

						<Button type="submit">Add Product</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
