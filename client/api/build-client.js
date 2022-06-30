import axios from 'axios';

export const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		return axios.create({
			baseURL: process.env.GATEWAY_URL,
			headers: req.headers,
		});
	}

	return axios.create({
		baseURL: 'http://localhost',
		withCredentials: true,
	});
};
