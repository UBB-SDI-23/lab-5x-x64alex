import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, Autocomplete, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL, authorization } from "../constants";
import { UserNameDTO } from "../models/Login/UserNameDTO";
import { useEffect, useState } from "react";

export const AdminDashboard = () => {
	const { transactionId } = useParams();
	const navigate = useNavigate();
	const config = {
		headers: {
		  Authorization: authorization,
		  'Content-Type': 'application/json'
		}
	}

    const config1 = {
        params: {
            scriptName: "sql_script1k.sql"
          },
		headers: {
		  Authorization: authorization,
		}
	}
    const [users, setUsers] = useState<UserNameDTO[]>([]);
    const [userId, setUserId] = useState<Number>(0);
	const [searchString, setSearchString] = useState("");


    useEffect(() => {
		fetch(`${BACKEND_API_URL}/user/usernames?searchString=${searchString}`)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});


	}, [searchString]);

	const deleteAllData = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.get(`${BACKEND_API_URL}/user/deleteAllEntities`, config);
		alert("all data is deleted")
		navigate("/");
	};

    const runScript = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		fetch(`${BACKEND_API_URL}/run-script}`, config1);
		alert("Script finished")
		navigate("/");
	};

    const editRoles = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.post(`${BACKEND_API_URL}/user/usernames/${userId}`, config);
		alert("Role has been edited")
		navigate("/");
	};
	


	return (
		<Container>
			<Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    Admin Dashboard
                </Stack>
				</CardContent>

			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					Delete All data
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={deleteAllData}>Delete it</Button>
				</CardActions>
			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					Run Generate script
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={runScript}>Run script</Button>
				</CardActions>
			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center"> 
                Edit roles   
                </Stack>


                <form onSubmit={editRoles}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={users.map((user) => user.username)}
							sx={{ mb: 2 }}
							onChange={(e, value) => {
								for (let i = 0; i < users.length; i++) {
									if(users[i].username === value){
                                        setUserId(users[i].id)
									}
								}
							}}
							renderInput={(params) => <TextField {...params} label="User Names" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/>

                        {/* <Autocomplete
							disablePortal
							id="combo-box-demo"
							options={products.map((product) => product.productName)}
							sx={{ mb: 2}}
							onChange={(e, value) => {
								for (let i = 0; i < products.length; i++) {
									if(products[i].productName === value){
										transaction.productId = products[i].productId;
									}
								}
							}}
							renderInput={(params) => <TextField {...params} label="Product Names" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/> */}
					

						<Button id = "submitButton" type="submit">Add Transaction </Button>
					</form>
				</CardContent>
				<CardActions>
					<Button onClick={editRoles}>edit</Button>
				</CardActions>
			</Card>
		</Container>
	);
	
};