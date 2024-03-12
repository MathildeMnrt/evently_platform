import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// we initialize a cache variable intend to hold the cached connexion to our db
let cached = (global as any).mongoose || { conn : null, promise : null };


export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // we either connect to an already cached connection or we create a new one
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
        dbName: 'evently',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;
    
    return cached.conn;

}
