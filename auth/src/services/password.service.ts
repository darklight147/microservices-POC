import argon from 'argon2';

class PasswordService {
	public async hash(raw: string): Promise<string> {
		return argon.hash(raw);
	}

	public async compare(hashed: string, plain: string): Promise<boolean> {
		return argon.verify(hashed, plain);
	}
}

export default new PasswordService();
