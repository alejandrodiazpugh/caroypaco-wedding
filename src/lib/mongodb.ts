import GuestListManager from './GuestManager';
import { MONGO_LOGIN, guests } from './guestModel';

class MongoDAO extends GuestListManager {
	constructor() {
		super(MONGO_LOGIN, guests);
	}
}

export default MongoDAO;
