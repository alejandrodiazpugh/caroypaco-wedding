import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDAO from '@/lib/mongodb';
import { TGuest } from '@/types/types';

type TId = { userId: string };

const guestsAPI = new MongoDAO(process.env.MONGODB_URI as string);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		const { method } = req;
		const { fullName } = req.query;
		if (method !== 'GET') {
			throw new Error('Incorrect method calling');
		}
		if (!fullName) {
			throw new Error('Query empty');
		}
		if (typeof fullName !== 'string') {
			throw new Error('Invalid request');
		}
		const guestInfo = await guestsAPI.getByFullName(fullName);
		if (!guestInfo) {
			return res.status(400).send({
				code: 400,
				msg: 'El nombre provisto no está en la lista, intenta solo con un nombre y apellido',
			});
		}
		return res.status(200).send({ code: 200, body: guestInfo });
	} catch (error) {
		console.error(error);
	}
}
