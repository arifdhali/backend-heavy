import bcrypt from "bcrypt";
import prisma from "../config/prisma";
const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });



        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        return res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export default LoginController