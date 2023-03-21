import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDAO from '@/lib/mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const guestsAPI = new MongoDAO(process.env.NEXT_PUBLIC_MONGODB_URI as string);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		const { method } = req;
		const { fullName } = req.query;
		const guestData = req.body;
		if (method !== 'PUT') {
			throw new Error('Incorrect method calling');
		}
		if (!fullName) {
			throw new Error('Query empty');
		}
		if (typeof fullName !== 'string') {
			throw new Error('Invalid request');
		}
		const updateGuest = await guestsAPI.update(fullName, guestData);
		if (!updateGuest) {
			return res.status(400).send({
				code: 400,
				body: 'El nombre provisto no está en la lista',
			});
		}
		return res.status(200).send(updateGuest);
	} catch (error) {
		console.error(error);
	}
}
