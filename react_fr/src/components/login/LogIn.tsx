import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { BACKEND_API_URL } from "../../constants";
import { LoginRequest } from "../../models/Login/LoginRequest";
import { useState } from "react";

export const Login = () => {
	const navigate = useNavigate();

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
	    username: "",
        password: ""
	});

	const handleLogin = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
	    axios.post(`${BACKEND_API_URL}/signin`, loginRequest)
        .then((response: AxiosResponse) => {
            // Manually define the type of the headers object as AxiosHeaders
            const headers: AxiosResponseHeaders = response.headers as AxiosResponseHeaders;
            // Get the Set-Cookie header from the headers object
            const setCookieHeader = headers['set-cookie'];
            console.log(setCookieHeader); // Prints the Set-Cookie header to the console

          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error(error);
          });

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

						<Button id = "submitButton" type="submit">Login</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};