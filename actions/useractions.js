import Users from "@/models/Users";
import connectDB from "@/db/ConnectDB";

export const createUser = async (user) => {
        await connectDB();
        const u = await Users.findOne({ email: user.email });
        if (u) {
            return u;
        }
        const newUser = await Users.create({
            name: user.fullName,
            email: user.email,
        });
        return newUser;
};