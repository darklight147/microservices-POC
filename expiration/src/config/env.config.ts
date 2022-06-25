import dotenv from 'dotenv';

dotenv.config();

export const envVars = {
	REDIS_HOST: process.env.REDIS_HOST,
	RABBIT_URL: process.env.RABBIT_URL,
};

export const checkVars = () => {
	for (const [key, value] of Object.entries(envVars)) {
		if (!value) {
			throw new Error(`Missing Value for ENV variable ${key}`);
		}
	}
};
