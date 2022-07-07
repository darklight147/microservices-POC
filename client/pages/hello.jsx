import { useEffect } from 'react';
import { useRequest } from '../hooks/use-request';
import { useRouter } from 'next/router';

function Hello(props) {
	const router = useRouter();

	const { doRequest, errors } = useRequest({
		method: 'get',
		url: 'http://localhost:4000',
		onSuccess: () => router.push('/'),
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		await doRequest();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="submit" value="Click Here" />
			</form>
			{errors?.map((error) => {
				return <div key={error.message}>{error.message}</div>;
			})}
		</div>
	);
}

export default Hello;
