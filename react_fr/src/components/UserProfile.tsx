import { Card, CardActions, CardContent, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserDetails } from "../models/Login/UserDetails";
import { UserStatistics } from "../models/Login/UserStatistics";

export const UserProfile = () => {
	const { userName } = useParams();
	const [userProfile, setUserProfile] = useState<UserDetails>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/user/${userName}`);
			const user = await response.json();
			setUserProfile(user);

		};
		fetchProduct();
	}, [userName]);

	const [userStatistic, setUserStatistics] = useState<UserStatistics>();

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`${BACKEND_API_URL}/user/statistics/${userName}`);
			const user = await response.json();
			setUserStatistics(user);
		};
		fetchProduct();
	}, [userName]);

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
					<p>User Name: {userProfile?.name}</p>
					<p>User Gender: {userProfile?.gender}</p>
					<p>User Bio: {userProfile?.bio}</p>
					<p>User Birthdate: {String(userProfile?.birthdate)}</p>
					<p>User Location: {userProfile?.location}</p>
					<p>User statistics:</p>
					<ul>
						<li>Categories Added:{userStatistic?.categoriesAdded}</li>
						<li>Products Added:{userStatistic?.productsAdded}</li>
						<li>Clients Added:{userStatistic?.clientsAdded}</li>
						<li>Transaction Added:{userStatistic?.transactionsAdded}</li>
					</ul>
				</Stack>		

				</CardContent>
			</Card>
		</Container>
	);
};