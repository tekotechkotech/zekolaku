import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ALLOWED_MIME_TYPES: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/svg+xml': 'svg',
	'image/gif': 'gif'
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized: Login administrator diperlukan untuk mengunggah file.');
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file');

		if (!file || !(file instanceof File)) {
			return json({ success: false, error: 'File tidak ditemukan dalam form data.' }, { status: 400 });
		}

		if (file.size > MAX_SIZE) {
			return json({ success: false, error: 'Ukuran file melebihi batas maksimal 5MB.' }, { status: 400 });
		}

		const mimeType = file.type;
		const ext = ALLOWED_MIME_TYPES[mimeType];
		if (!ext) {
			return json(
				{
					success: false,
					error: 'Tipe file tidak didukung. Harap unggah format JPEG, PNG, WebP, SVG, atau GIF.'
				},
				{ status: 400 }
			);
		}

		const uploadDir = path.resolve('static/uploads');
		await fs.mkdir(uploadDir, { recursive: true });

		const randomSuffix = crypto.randomBytes(4).toString('hex');
		const filename = `${Date.now()}-${randomSuffix}.${ext}`;
		const filePath = path.join(uploadDir, filename);

		const buffer = Buffer.from(await file.arrayBuffer());
		await fs.writeFile(filePath, buffer);

		return json({
			success: true,
			url: `/uploads/${filename}`
		});
	} catch (err: any) {
		console.error('File upload error:', err);
		return json({ success: false, error: 'Gagal mengunggah file. Silakan coba lagi.' }, { status: 500 });
	}
};
