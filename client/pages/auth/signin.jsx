import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import { useEffect } from 'react';

function SignIn({ currentUser }) {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (currentUser) {
			router.push('/profile');
		}
	}, []);

	const { doRequest, errors } = useRequest({
		body: {
			username,
			password,
		},
		method: 'post',
		onSuccess: (data) => setSuccess(true) && router.push('/profile'),
		url: '/api/auth/login',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!username || !password) {
			return;
		}

		await doRequest();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="">Username</label>
				<input
					type="text"
					name=""
					id=""
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="">Password</label>
				<input
					type="password"
					name=""
					id=""
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="login" />
			</form>
			{errors?.map((error) => {
				return <div key={error.message}>{error.message}</div>;
			})}

			{success && 'Logged In'}
		</div>
	);
}

SignIn.getInitialProps = (context, client, currentUser) => {
	return {
		currentUser,
	};
};

export default SignIn;
