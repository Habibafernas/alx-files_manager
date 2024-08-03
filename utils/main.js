import dbClient from './db';

const waitConnection = async () => {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = 1000;

    while (attempts < maxAttempts) {
        if (dbClient.isAlive()) {
            return;
        }

        attempts += 1;
        await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('Unable to connect to the database after multiple attempts.');
};

(async () => {
    try {
        await dbClient.connect(); // Ensure connection is established
        console.log('Initial DB status:', dbClient.isAlive());
        await waitConnection();
        console.log('DB status after wait:', dbClient.isAlive());
        console.log('Number of users:', await dbClient.nbUsers());
        console.log('Number of files:', await dbClient.nbFiles());
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
