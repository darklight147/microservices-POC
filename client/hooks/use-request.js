import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ method, url, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		setErrors(null);

		try {
			const response = await axios[method](
				url,
				body,
				method === 'post' && { withCredentials: true }
			);

			onSuccess(response.data);
		} catch (error) {
			setErrors(error.response.data.errors);
		}
	};

	return { doRequest, errors };
};
