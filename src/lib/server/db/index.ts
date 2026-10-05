import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connectionUri = process.env.DATABASE_URL || 'mysql://faiz:passwordku@127.0.0.1:3306/zekolaku';

const poolConnection = mysql.createPool({
	uri: connectionUri,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
export { schema };
