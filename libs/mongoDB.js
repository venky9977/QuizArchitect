import mongoose from 'mongoose';

const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

export { connectToDB };
