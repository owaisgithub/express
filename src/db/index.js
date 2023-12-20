import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://owaisamu20:Owais123@cluster0.0ia4ro6.mongodb.net/test');
        console.log(`\nMongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default connectDB;