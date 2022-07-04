import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Profile({ currentUser }) {
	const router = useRouter();

	const [expiration, setExpiration] = useState(null);

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

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<h1>Welcome {currentUser.username.toUpperCase()}</h1>
			{expiration && <p>Your token expires in {expiration} seconds</p>}
		</div>
	);
}

export default Profile;

Profile.getInitialProps = async (context, client, currentUser) => {
	return {
		currentUser,
	};
};
