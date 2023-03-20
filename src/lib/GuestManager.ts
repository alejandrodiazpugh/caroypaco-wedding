import { TGuest } from '@/types/types';
import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

export default class GuestListManager {
	model: mongoose.Model<any, {}, {}, {}, any, any>;
	url: string;
	connection: null | any;

	constructor(url: string, model: mongoose.Model<any, {}, {}, {}, any, any>) {
		this.model = model;
		this.url = url;
		this.connection = null;
	}

	async connect() {
		try {
			mongoose.set('strictQuery', false);
			this.connection = await mongoose.connect(this.url, {
				dbName: 'caro-paco',
			});
			console.log('Conexion establecida a MongoDB');
		} catch (err) {
			throw new Error(`Error conectando a MongoDB: ${err}`);
		}
	}

	// ===== CRUD =====
	async getAll() {
		try {
			await this.connect();
			return await this.model.find({});
		} catch (err) {
			console.error(`Error al obtener objetos en la BD: ${err}`);
		}
	}

	async getByFullName(query: string) {
		try {
			await this.connect();
			return await this.model.findOne({ fullname: query });
		} catch (err) {
			console.error(`Error al obtener objeto en la BD: ${err}`);
		}
	}

	// async save(data: TGuest) {
	// 	try {
	// 		this.connect();
	// 		const id = await this.generateId();
	// 		const parsedData = { ...data, id };
	// 		const saveData = await this.model.create(parsedData);
	// 		return await saveData;
	// 	} catch (err) {
	// 		console.error(`Error al guardar objeto en la BD: ${err}`);
	// 	}
	// }

	async update(query: string, data: Partial<TGuest>) {
		try {
			const filter = { fullname: query };
			const update = { ...data };
			this.connect();
			const updatedData = await this.model.findOneAndUpdate(
				filter,
				update,
				{ upsert: true, new: true }
			);
			console.log(await updatedData);
			return await updatedData;
		} catch (err) {
			console.error(`Error al actualizar la base de datos: ${err}`);
		}
	}

	async deleteById(query: string) {
		try {
			this.connect();
			const deleteData = await this.model.deleteOne({ id: query });
			return await deleteData;
		} catch (err) {
			console.error(`Error al eliminar elemento: ${err}`);
		}
	}
}
