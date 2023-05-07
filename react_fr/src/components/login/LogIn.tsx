import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { BACKEND_API_URL } from "../../constants";
import { LoginRequest } from "../../models/Login/LoginRequest";
import { useState } from "react";
import Cookies from 'js-cookie';


export const Login = () => {
	const navigate = useNavigate();

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
	    username: "",
        password: ""
	});

	const handleLogin = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: loginRequest.username,password:loginRequest.password}),
        };

        const response = await fetch(`${BACKEND_API_URL}/signin`,requestOptions);
        const product = await response.json();
        console.log(product.jwtToken);
        console.log(product.jwtToken);

        Cookies.set('cookie','231');
        document.cookie = product.jwtToken;


        // Cookies.set('confirmation', product.jwtToken,{
        //     httpOnly: true,
        //     path: '/api',
        //     domain: 'localhost',
        //     secure: false,
        //     expires: 0, // Session cookie
        //   });

		alert("Sigin")
		navigate("/");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/categories");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`} >
							<ArrowBackIcon />
						</IconButton>{" "}
                        <h3>LogIn</h3>
					</Stack>

					<form onSubmit={handleLogin}>
						<TextField
                            type="string"
							id="name"
							label="username"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => loginRequest.username = newValue.target.value}
						/>
                        <TextField
                            type="password"
							id="name"
							label="password"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => loginRequest.password = newValue.target.value}
						/>

						<Button id = "submitButton" type="submit"> Login </Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};