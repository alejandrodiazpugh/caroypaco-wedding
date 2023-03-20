import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const guestSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		fullname: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		drinks: { type: [String], required: true },
		otherDrink: { type: String, required: true },
		isAttending: { type: String, required: true },
		guests: { type: Number, required: true },
	},
	{ collection: 'guests' }
);

export const guests =
	mongoose.models.guests || mongoose.model('guests', guestSchema);

export const MONGO_LOGIN =
	'mongodb+srv://alejandroDiazPugh:jbEHo1QB6p3FXCOO@wedding-info.yvv2oms.mongodb.net/?retryWrites=true&w=majority';
