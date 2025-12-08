import cron from "node-cron";
import { prisma } from "../config/db";

cron.schedule("*/5 * * * *", async () => {
    console.log("Running OTP cleanup job...");
    try {
        const result = await prisma.otp.deleteMany({
            where: { 
                expiresAt: { 
                    lt: new Date(),
                },
            },
        });

        if (result.count > 0) {
            console.log(`Deleted ${result.count} expired OTP(s).`);
        }
    } catch (err) {
        console.error("OTP cleanup failed:", err);
    }
});
