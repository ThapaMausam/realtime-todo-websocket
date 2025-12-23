import mongoose from 'mongoose';
import { envConfig } from './config.ts';

async function connectToDb() {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully.")
        })
        await mongoose.connect(envConfig.mongodb as string)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectToDb