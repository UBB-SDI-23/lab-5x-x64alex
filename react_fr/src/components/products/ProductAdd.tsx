
import { Button, Card, CardActions, CardContent, IconButton, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL, authorization } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Product } from "../../models/Product/Product";
import { CategoryName } from "../../models/Category/CategoryName";


export const ProductAdd = () => {
	const navigate = useNavigate();

	const config = {
		headers: {
		  Authorization: authorization,
		  'Content-Type': 'application/json'
		}
};

	const [product, setProduct] = useState<Product>({
	    productName: "",
    	productPrice: -1000,
    	productQuantity: -1000,
    	productOnSale: false,
    	productWeight: -1000,
		categoryId: -1000,
	});
	const [categories, setCategories] = useState<CategoryName[]>([]);
	const [searchString, setSearchString] = useState("");
	const [addButtonDissabled, setAddButtonDissabled] = useState(false);

	useEffect(() => {
		fetch(`${BACKEND_API_URL}/categories/names?searchString=${searchString}`)
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});
	}, [searchString]);

	const [productPriceError, setProductPriceError] = useState(false);
	const [productPriceString, setProductPriceString] = useState<String>("");
	const [productPriceHelper, setProductPriceHelper] = useState("");
	const checkNewPrice = (newValue: String) => {
		setProductPriceError(false);
		setProductPriceHelper("");
		setProductPriceString(newValue);
		setAddButtonDissabled(false);

		if(newValue === ""){
			setProductQuantityError(true);
			setProductQuantityHelper("The input must not be empty");
			setAddButtonDissabled(true);
		}

		var newPrice = Number(newValue);
		if (isNaN(newPrice)){
			setProductPriceError(true);
			setProductPriceHelper("The input must be a number");
			setAddButtonDissabled(true);
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
		setAddButtonDissabled(false);

		if(newValue === ""){
			setProductQuantityError(true);
			setProductQuantityHelper("The input must not be empty");
			setAddButtonDissabled(true);
		}


		var newQuantity = Number(newValue);
		if (isNaN(newQuantity) || !Number.isInteger(newQuantity)){
			setProductQuantityError(true);
			setProductQuantityHelper("The input must be an integer");
			setAddButtonDissabled(true);

			return false;
		}
		else{
			product.productQuantity = newQuantity;
			return true;
		}

	}

	const [productSaleError, setProductSaleError] = useState(false);
	const [productSaleString, setProductSaleString] = useState<String>("");
	const [productSaleHelper, setProductSaleHelper] = useState("");
	const checkNewSale = (newValue: String) => {
		setProductSaleError(false);
		setProductSaleHelper("");
		setProductSaleString(newValue);
		setAddButtonDissabled(false);


		if(newValue === ""){
			setProductQuantityError(true);
			setProductQuantityHelper("The input must not be empty");
			setAddButtonDissabled(true);
		}

		if (newValue !== "true" && newValue !== "false"){
			setProductSaleError(true);
			setProductSaleHelper("The input must be a bool");
			setAddButtonDissabled(true);

			return false;
		}
		else{
			var newSale = Boolean(newValue);
			product.productOnSale = newSale;
			return true;
		}

	}

	const [productWeightError, setProductWeightError] = useState(false);
	const [productWeightString, setProductWeightString] = useState<String>("");
	const [productWeightHelper, setProductWeightHelper] = useState("");
	const checkNewWeight = (newValue: String) => {
		setProductWeightError(false);
		setProductWeightHelper("");
		setProductWeightString(newValue);
		setAddButtonDissabled(false);

		if(newValue === ""){
			setProductQuantityError(true);
			setProductQuantityHelper("The input must not be empty");
			setAddButtonDissabled(true);
		}


		var newWeight = Number(newValue);
		if (isNaN(newWeight)){
			setProductWeightError(true);
			setProductWeightHelper("The input must be a number");
			setAddButtonDissabled(true);
			return false;
		}
		else{
			product.productWeight = newWeight;
			return true;
		}

	}



	const addProduct = (event: { preventDefault: () => void }) => {
		if(product.productName === "" || product.productPrice === -1000 || product.productQuantity === -100 || product.productWeight === -1000 || product.categoryId === -1000){
			alert("Error: all textfileds must not be empty")
		}else{
			event.preventDefault();
			try {
				axios.post(`${BACKEND_API_URL}/products`, product, config);
				alert("Product added")
				navigate("/products");
			} catch (error) {
				setAddButtonDissabled(true);
				console.log(error);
			}
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/products`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={addProduct}>
						<TextField
							id="productName"
							label="Product Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setProduct({ ...product, productName: event.target.value })}
						/>
						<TextField 
							value={productPriceString} 
							error={productPriceError} 
							id="productPrice"
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
							id="productQuantity" 
							label="Product Quantity"
							variant="outlined" 
							fullWidth
							sx={{ mb: 2 }}
							helperText={productQuantityHelper}
							onChange={(newValue) => {
								checkNewQuantity(newValue.target.value)
							}}/>
						<TextField 
							value={productSaleString} 
							error={productSaleError} 
							label="Product Sale"
							id="productSale" 
							variant="outlined" 
							fullWidth
							sx={{ mb: 2 }}
							helperText={productSaleHelper}
							onChange={(newValue) => {
								checkNewSale(newValue.target.value)
							}}
						/>
						<TextField 
							value={productWeightString} 
							error={productWeightError} 
							id="productWeight" 
							label="Product Weight"
							variant="outlined" 
							fullWidth
							sx={{ mb: 2 }}
							helperText={productWeightHelper}
							onChange={(newValue) => {
								checkNewWeight(newValue.target.value)
							}}
						/>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={categories.map((category) => category.categoryName)}
							sx={{ width: 300 }}
							onChange={(e, value) => {
								for (let i = 0; i < categories.length; i++) {
									if(categories[i].categoryName ===value){
										product.categoryId = categories[i].categoryId;
									}
								}
							}}
							renderInput={(params) => <TextField {...params} label="Category Names" id ="categoryName" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/>

						<Button disabled={addButtonDissabled} id = "submitButton" type="submit">Add Product</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
