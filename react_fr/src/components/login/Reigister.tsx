import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { BACKEND_API_URL,userRole,updateGlobalVar,updateUserRole,updateUserName, userName } from "../../constants";
import { LoginRequest } from "../../models/Login/LoginRequest";
import { useState } from "react";
import { SignUpRequest } from "../../models/Login/SignUpRequest";


export const Register = () => {
	const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [signup, setSignUp] = useState<SignUpRequest>(
        {
            username: "",
            password: "",
            name: "",
            gender: "",
            bio: "",
            location: "",
            birthdate: new Date("20.02.2002")
        }
    );
    const handleButtonClick = () => {
        if (signup.password.length < 8) {
          setError(true);
          return true;
        } else {
          setError(false);
          return false;
        }
      };

	const handleRegister = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if(!handleButtonClick()){
                axios.post(`${BACKEND_API_URL}/register`, signup)
                .then((response) => {
                    console.log(response.data);
                    const { username, confirmationToken } = response.data;
                    console.log(username, confirmationToken);
                    alert("Registration code is: "+confirmationToken)
                    navigate("/confirmation");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("Already exits this user in database")
                  });                  

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
                        <h3>Register</h3>
					</Stack>

					<form onSubmit={handleRegister}>
						<TextField
                            type="string"
							id="name"
							label="username"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.username = newValue.target.value}
						/>
                        <TextField
                            type="password"
							id="name"
							label="password"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => {signup.password = newValue.target.value; handleButtonClick();}}
                            error={error}
                            helperText={error ? "Password must be at least 8 characters long" : ""}
						/>
                        <TextField
                            type="string"
							id="name"
							label="name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.name = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="bio"
							label="bio"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.bio = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="gender"
							label="gender"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.gender = newValue.target.value}
						/>
                        <TextField
                            type="string"
							id="location"
							label="location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.location = newValue.target.value}
						/>
                        <TextField
                            type="date"
							id="birthdate"
							label="birthdate"
							variant="outlined"
                            InputProps={{
                                defaultValue: "2000-05-08"
                              }}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.birthdate = new Date(newValue.target.value)}
						/>
						<Button id = "submitButton" type="submit"> Register </Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};