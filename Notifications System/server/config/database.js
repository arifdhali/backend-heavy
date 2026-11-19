import prisma from "./prisma.js";

export async function connectDatabase() {
    try {
        await prisma.$connect();

        console.log("✅ MySQL connected successfully through Prisma!");

        // Test query
        const userCount = await prisma.user.count();

        console.log("Total users:", userCount);

    } catch (error) {
        console.error("❌ Database connection failed:", error);

        throw error;
    }
}