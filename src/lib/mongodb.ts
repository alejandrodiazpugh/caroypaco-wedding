import GuestListManager from './GuestManager';
import { guests } from './guestModel';

class MongoDAO extends GuestListManager {
	URI!: string;
	constructor(URI: string) {
		super(URI, guests);
	}
}

export default MongoDAO;
