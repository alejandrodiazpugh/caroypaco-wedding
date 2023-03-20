import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const guestSchema = new mongoose.Schema(
	{
		userId: { type: String, required: false },
		firstName: { type: String, required: false },
		lastName: { type: String, required: false },
		fullname: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		drinks: { type: String, required: false },
		otherDrink: { type: String, required: false },
		isAttending: { type: String, required: false },
		confirmed: { type: Number, required: false },
		guests: { type: Number, required: true },
	},
	{ collection: 'guests' }
);

export const guests =
	mongoose.models.guests || mongoose.model('guests', guestSchema);

export const MONGO_LOGIN = process.env.DB_HOST;
