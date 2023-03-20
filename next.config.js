/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		// @ts-ignore
		BASE_URL: process.env.NEXT_PUBLIC_MONGODB_URI,
	},
};

module.exports = nextConfig;
