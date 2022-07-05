import { useRequest } from '../../hooks/use-request';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SignUpVisitor() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const { doRequest, errors } = useRequest({
		method: 'post',
		url: '/api/auth/signup/visitor',
		body: { username: email, password },
		onSuccess: () => {
			router.push('/profile');
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await doRequest();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" className="btn btn-primary" value={'Submit'} />
				</div>
			</form>

			{errors && errors.length > 0 && (
				<div className="alert alert-danger">
					<ul className="mb-0">
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default SignUpVisitor;
