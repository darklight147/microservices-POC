import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Profile({ currentUser }) {
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push('/auth/signin');
		}
	}, []);

	return (
		<div>
			<h1>Welcome {currentUser.username.toUpperCase()}</h1>
		</div>
	);
}

export default Profile;

Profile.getInitialProps = async (context, client, currentUser) => {
	return {
		currentUser,
	};
};
