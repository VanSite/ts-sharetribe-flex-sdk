import { v4 as uuidv4 } from 'uuid';

class UUID {
  uuid: string;

  constructor(uuid?: string) {
    if (uuid !== undefined && typeof uuid !== 'string') {
      console.warn('uuid must be a string');
      // If it's not a string, fallback to a generated UUID
      this.uuid = uuidv4();
    } else {
      // If uuid is not provided or is a string, use it or generate a new one
      this.uuid = uuid || uuidv4();
    }
  }

  toString() {
    return this.uuid;
  }
}

export default UUID;
