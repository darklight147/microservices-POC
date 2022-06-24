export const addDays = (date: Date, days: number) => {
	const result = new Date();
	result.setDate(date.getDate() + days);
	return result;
};
