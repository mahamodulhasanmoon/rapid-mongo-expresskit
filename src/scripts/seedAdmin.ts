/**
 * Creates a default admin user if one does not exist for the seed email.
 *
 * Run from server/:  pnpm seed:admin
 *
 * Env (optional):
 *   ADMIN_SEED_EMAIL    default: admin@zen-education.local
 *   ADMIN_SEED_PASSWORD default: Admin@123456  (change in production!)
 *   ADMIN_SEED_NAME     default: Zen Admin
 *   ADMIN_SEED_USERNAME default: derived from email local-part, or zenadmin
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { mongoUrl } from '../config';
import { connectMongoDB } from '../db/dbConnect';
import { User } from '../modules/user/user.model';

function deriveUsername(email: string, fallback: string) {
	const local = email.split('@')[0]?.replace(/[^a-zA-Z0-9_.-]/g, '') || '';
	return local.length >= 2 ? local : fallback;
}

async function main() {
	if (!mongoUrl) {
		// eslint-disable-next-line no-console
		console.error('Missing mongoDB_URI in environment (.env).');
		process.exit(1);
	}

	const email =
		process.env.ADMIN_SEED_EMAIL?.trim() || 'admin@zen-education.local';
	const password =
		process.env.ADMIN_SEED_PASSWORD?.trim() || 'Admin@123456';
	const name = process.env.ADMIN_SEED_NAME?.trim() || 'Zen Admin';
	let username =
		process.env.ADMIN_SEED_USERNAME?.trim() ||
		deriveUsername(email, 'zenadmin');

	await connectMongoDB(mongoUrl);

	const byEmail = await User.findOne({ email }).select('+password');
	if (byEmail) {
		if (byEmail.role === 'admin') {
			// eslint-disable-next-line no-console
			console.log(`Admin already exists for ${email}.`);
			// eslint-disable-next-line no-console
			console.log(
				'If you forgot the password, use forgot-password or set ADMIN_SEED_PASSWORD and delete this user, then run seed again.',
			);
			await mongoose.disconnect();
			process.exit(0);
		}
		byEmail.role = 'admin';
		byEmail.password = password;
		await byEmail.save();
		// eslint-disable-next-line no-console
		console.log(`Existing user ${email} was promoted to admin and password was reset from ADMIN_SEED_PASSWORD.`);
		// eslint-disable-next-line no-console
		console.log(`  New password (this run only): ${password}`);
		await mongoose.disconnect();
		process.exit(0);
	}

	let suffix = 0;
	while (await User.findOne({ username: suffix ? `${username}${suffix}` : username })) {
		suffix += 1;
	}
	if (suffix) username = `${username}${suffix}`;

	await User.create({
		name,
		username,
		email,
		password,
		role: 'admin',
	});

	// eslint-disable-next-line no-console
	console.log('Admin user created. Use these credentials to sign in at /admin/login:');
	// eslint-disable-next-line no-console
	console.log(`  Email:    ${email}`);
	// eslint-disable-next-line no-console
	console.log(`  Password: ${password}`);
	// eslint-disable-next-line no-console
	console.log('Override with ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD in .env. Change the password after first login.');

	await mongoose.disconnect();
	process.exit(0);
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});
