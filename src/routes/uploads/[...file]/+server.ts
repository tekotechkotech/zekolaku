import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'node:fs/promises';
import path from 'node:path';

const MIME_TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.gif': 'image/gif'
};

export const GET: RequestHandler = async ({ params }) => {
	const filename = params.file;
	if (!filename) {
		throw error(400, 'Nama file wajib disertakan');
	}

	const uploadDir = path.resolve('static/uploads');
	const safePath = path.resolve(uploadDir, filename);

	// Prevent directory traversal
	if (!safePath.startsWith(uploadDir)) {
		throw error(403, 'Akses ke berkas ditolak');
	}

	try {
		const stat = await fs.stat(safePath);
		if (!stat.isFile()) {
			throw error(404, 'Berkas tidak ditemukan');
		}

		const ext = path.extname(safePath).toLowerCase();
		const contentType = MIME_TYPES[ext] || 'application/octet-stream';
		const fileBuffer = await fs.readFile(safePath);

		return new Response(fileBuffer, {
			headers: {
				'Content-Type': contentType,
				'Content-Length': stat.size.toString(),
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
	} catch (err: any) {
		if (err?.status === 400 || err?.status === 403 || err?.status === 404) {
			throw err;
		}
		throw error(404, 'Berkas tidak ditemukan');
	}
};
