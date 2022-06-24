import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
	{
		name: String,
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

export const Role = mongoose.model('Role', roleSchema);
