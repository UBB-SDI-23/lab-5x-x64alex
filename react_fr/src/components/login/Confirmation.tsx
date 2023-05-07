import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { BACKEND_API_URL,userRole,updateGlobalVar,updateUserRole,updateUserName, userName } from "../../constants";
import { LoginRequest } from "../../models/Login/LoginRequest";
import { useState } from "react";


export const Confirmation = () => {
	const navigate = useNavigate();

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
	    username: "",
        password: ""
	});

	const handleLogin = async (event: { preventDefault: () => void }) => {
        try{
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: loginRequest.username,password:loginRequest.password}),
        };

        const response = await fetch(`${BACKEND_API_URL}/signin`,requestOptions);
        const product = await response.json();
        const value = product.jwtToken.split('=')[1].split(';')[0] as string;
        updateGlobalVar(value);

        updateUserName(product.username);
        console.log(userName);

        console.log(product.roles);
        console.log(product.roles[0]);
        updateUserRole(product.roles[0]);
        console.log(userRole);

        alert("Account is confirmed")
		navigate("/");
        }catch(error){
            alert("Error")
        }
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/`} >
							<ArrowBackIcon />
						</IconButton>{" "}
                        <h3>LogIn</h3>
					</Stack>

					<form onSubmit={handleLogin}>
						<TextField
                            type="string"
							id="name"
							label="Confirmation code"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => loginRequest.username = newValue.target.value}
						/>

						<Button id = "submitButton" type="submit"> Confirm </Button>
					</form>
                    <h2>Do not have an account yet?</h2>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/register`}>
						<h3>Register now</h3>
					</IconButton>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};