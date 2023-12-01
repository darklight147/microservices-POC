import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WeatherList from '../components/WeatherList';
import { useRequest } from '../hooks/use-request';

function Profile({ currentUser }) {
	const router = useRouter();

	const [expiration, setExpiration] = useState(null);
	const [forecast, setForecast] = useState([]);

	const { doRequest, errors } = useRequest({
		method: 'get',
		url: 'http://localhost/dotnet/weatherforecast',
		body: {},
		onSuccess: (data) => {
			setForecast(data);
		},
	});

	useEffect(() => {
		if (!currentUser) {
			router.push('/auth/signin');
			return;
		}

		if (currentUser.exp) {
			setExpiration(Math.floor(currentUser.exp - Date.now() / 1000));
		}

		const interval = setInterval(() => {
			setExpiration(Math.floor(currentUser.exp - Date.now() / 1000));
		}, 1000);

		doRequest();

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<h1 style={{
				color: 'red'
			}}>Data from Auth service</h1>
			<h1>Welcome {currentUser.username.toUpperCase()}</h1>
			{expiration && <p>Your token expires in {expiration} seconds</p>}

			<h1
				style={{
					color: 'red',
				}} 
			>Data from Dotnet Service</h1>
			<WeatherList weatherData={forecast} />
		</div>
	);
}

export default Profile;

Profile.getInitialProps = async (context, client, currentUser) => {
	return {
		currentUser,
	};
};
