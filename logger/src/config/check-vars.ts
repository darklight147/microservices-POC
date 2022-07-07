const vars = {
	RABBIT_URL: process.env.RABBIT_URL,
};

export const checkVars = () => {
	for (const [key, value] of Object.entries(vars)) {
		if (!value) {
			throw new Error(`${key} is not set`);
		}
	}
};
