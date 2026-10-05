import crypto from 'node:crypto';
import { db, schema } from './db';
import { eq } from 'drizzle-orm';

export function hashPassword(password: string): string {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
	const [salt, hash] = storedHash.split(':');
	if (!salt || !hash) return false;
	const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
	return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'));
}

export async function createSession(userId: string): Promise<string> {
	const sessionId = crypto.randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

	await db.insert(schema.sessions).values({
		id: sessionId,
		userId,
		expiresAt
	});

	return sessionId;
}

export async function validateSession(sessionId: string) {
	const [session] = await db
		.select()
		.from(schema.sessions)
		.where(eq(schema.sessions.id, sessionId))
		.limit(1);

	if (!session) return null;

	if (session.expiresAt.getTime() < Date.now()) {
		await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId));
		return null;
	}

	const [user] = await db
		.select()
		.from(schema.users)
		.where(eq(schema.users.id, session.userId))
		.limit(1);

	if (!user) {
		await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId));
		return null;
	}

	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId));
}
