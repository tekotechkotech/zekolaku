import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false,
			trustedOrigins: ['https://zekolaku.faizen.biz.id']
		}
	}
};

export default config;
