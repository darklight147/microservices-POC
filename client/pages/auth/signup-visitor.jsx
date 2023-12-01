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



	if (errors) {
		console.log(errors);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await doRequest();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<div className="field is-horizontal">
						<div className="field-label is-normal">
							<label className="label">Email</label>
						</div>
						<div className="field-body">
							<div className="field">
								<p className="control">
									<input
										className="input"
										type="email"
										defaultValue="me@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</p>
							</div>
						</div>
					</div>
					<div className="field is-horizontal">
						<div className="field-label is-normal">
							<label className="label">Password</label>
						</div>
						<div className="field-body">
							<div className="field">
								<p className="control">
									<input
										className="input"
										type="password"
										placeholder="Recipient password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</p>
							</div>
						</div>
					</div>
					<button className="button is-info" type="submit">
						Submit
					</button>
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
