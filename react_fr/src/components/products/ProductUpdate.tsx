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
import { CategoryName } from "../../models/CategoryName";


export const ProductUpdate = () => {
    const { productId } = useParams();
	const [categories, setCategories] = useState<CategoryName[]>([]);
	const [searchString, setSearchString] = useState("");

	const navigate = useNavigate();
    const updateProduct = async (event: { preventDefault: () => void }) => {

		event.preventDefault();
		try {
			await axios.put(`${BACKEND_API_URL}/products/${productId}`, product);
			alert("Product updated")
			navigate("/products");
		} catch (error) {
			setProductCategoryIdError(true);
			setProductCategoryIdHelper("Category id doesn't exist");
			setAddButtonDissabled(true);
			console.log(error);
		}
	};



    const [product, setProduct] = useState<Product>({
	    productName: "",
    	productPrice: 0,
    	productQuantity: 0,
    	productOnSale: false,
    	productWeight: 0,
		categoryId: 1,
	});


	useEffect(() => {
		fetch(`${BACKEND_API_URL}/categories/names?searchString=${searchString}`)
		.then((response) => response.json())
		.then((data) => {
			setCategories(data);
		});

		const fetchProduct = async () => {
            
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/products/${productId}`)
                .then(response => response.json())
                .then(response => {

                console.log(response)
                checkNewName(response.productName);
                checkNewPrice(String(response.productPrice!));
                checkNewQuantity(String(response.productQuantity));
                checkNewSale(String(response.productOnSale));
                checkNewWeight(String(response.productWeight));
                checkNewCategoryId(String(response.categoryDTO.categoryId));

				
            });
            
		};
		fetchProduct();
	}, [searchString]);



	const [addButtonDissabled, setAddButtonDissabled] = useState(false);

	const [productNameString, setProductNameString] = useState<String>("");
	const checkNewName = (newValue: String) => {
		setProductNameString(newValue);

		var newName = String(newValue);
		product.productName = newName;

	}

	const [productPriceError, setProductPriceError] = useState(false);
	const [productPriceString, setProductPriceString] = useState<String>("");
	const [productPriceHelper, setProductPriceHelper] = useState("");
	const checkNewPrice = (newValue: String) => {
		setProductPriceError(false);
		setProductPriceHelper("");
		setProductPriceString(newValue);
		setAddButtonDissabled(false);

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

	const [productCategoryIdError, setProductCategoryIdError] = useState(false);
	const [productCategoryIdString, setProductCategoryIdString] = useState<String>("");
	const [productCategoryIdHelper, setProductCategoryIdHelper] = useState("");
	const checkNewCategoryId = (newValue: String) => {
		setProductCategoryIdError(false);
		setProductCategoryIdHelper("");
		setProductCategoryIdString(newValue);
		setAddButtonDissabled(false);


	}





	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/products`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={updateProduct}>
                        <TextField 
        					value = {`Id: ${productId}`}
                            variant="outlined"
                            disabled = {true}
							fullWidth
							sx={{ mb: 2 }}
                        />
						<TextField
                        	value={productNameString} 
							id="name"
							label="Product Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
                            onChange={(newValue) => {
								checkNewName(newValue.target.value)
							}}/>
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
							value={productSaleString} 
							error={productSaleError} 
							label="Product Sale"
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
							renderInput={(params) => <TextField {...params} label="Category Names" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/>


						<Button disabled={addButtonDissabled} id = "submitButton" type="submit">Update Product</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
