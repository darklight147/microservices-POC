import { Role } from '../models/Role';
import { User } from '../models/User';
import { Document } from 'mongoose';
import { ROLE } from '@quasimodo147/common';

export interface RoleDoc extends Document {
	name: string;
}

class RoleService {
	public async findById(id: string) {
		return (await Role.findById(id)) as RoleDoc;
	}

	public async findByName(name: ROLE) {
		return (await Role.findOne({
			name,
		})) as RoleDoc;
	}

	public async createIfNotExists(name: ROLE) {
		const role = await this.findByName(name);

		if (!role) {
			return (await Role.create({
				name,
			})) as RoleDoc;
		}
	}
}

export default new RoleService();
