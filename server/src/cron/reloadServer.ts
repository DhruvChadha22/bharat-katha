import cron from "node-cron";
import axios from "axios";

cron.schedule("*/30 * * * * *", async () => {
    try {
        const response = await axios.get(process.env.BACKEND_URL!);
        console.log("Server reloaded: ", response.data);
    } catch (error: any) {
        console.log("Error:", error.message);
    }
});
