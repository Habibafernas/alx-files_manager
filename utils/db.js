import mongodb from 'mongodb';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
  }

  /**
   * Connects to the MongoDB server.
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.topology.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<number>}
   */
  async nbUsers() {
    try {
      return this.client.db().collection('users').countDocuments();
    } catch (error) {
      console.error('Error retrieving number of users:', error);
      throw error;
    }
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<number>}
   */
  async nbFiles() {
    try {
      return this.client.db().collection('files').countDocuments();
    } catch (error) {
      console.error('Error retrieving number of files:', error);
      throw error;
    }
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    try {
      return this.client.db().collection('users');
    } catch (error) {
      console.error('Error retrieving users collection:', error);
      throw error;
    }
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    try {
      return this.client.db().collection('files');
    } catch (error) {
      console.error('Error retrieving files collection:', error);
      throw error;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
