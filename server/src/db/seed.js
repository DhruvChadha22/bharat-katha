import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const languages = [
        {
            name: "Hindi",
            maleVoice: "hi-IN-MadhurNeural",
            femaleVoice: "hi-IN-SwaraNeural",
        },
        {
            name: "English",
            maleVoice: "en-IN-PrabhatNeural",
            femaleVoice: "en-IN-NeerjaNeural",
        },
        {
            name: "Bengali",
            maleVoice: "bn-IN-BashkarNeural",
            femaleVoice: "bn-IN-TanishaaNeural",
        },
        {
            name: "Gujarati",
            maleVoice: "gu-IN-NiranjanNeural",
            femaleVoice: "gu-IN-DhwaniNeural",
        },
        {
            name: "Kannada",
            maleVoice: "kn-IN-GaganNeural",
            femaleVoice: "kn-IN-SapnaNeural",
        },
        {
            name: "Malayalam",
            maleVoice: "ml-IN-MidhunNeural",
            femaleVoice: "ml-IN-SobhanaNeural",
        },
        {
            name: "Marathi",
            maleVoice: "mr-IN-ManoharNeural",
            femaleVoice: "mr-IN-AarohiNeural",
        },
        {
            name: "Tamil",
            maleVoice: "ta-IN-ValluvarNeural",
            femaleVoice: "ta-IN-PallaviNeural",
        },
        {
            name: "Telugu",
            maleVoice: "te-IN-MohanNeural",
            femaleVoice: "te-IN-ShrutiNeural",
        },
        {
            name: "Urdu",
            maleVoice: "ur-IN-SalmanNeural",
            femaleVoice: "ur-IN-GulNeural",
        },
    ];

    for (const lang of languages) {
        const createdLang = await prisma.language.upsert({
            where: { name: lang.name },
            update: {},
            create: { 
                name: lang.name,
            },
        });

        await prisma.voice.upsert({
            where: { 
                languageId_type: {
                    languageId: createdLang.id,
                    type: "Male",
                }
            },
            update: {},
            create: {
                name: lang.maleVoice,
                languageId: createdLang.id,
                type: "Male",
            },
        });

        await prisma.voice.upsert({
            where: { 
                languageId_type: {
                    languageId: createdLang.id,
                    type: "Female",
                }
            },
            update: {},
            create: {
                name: lang.femaleVoice,
                languageId: createdLang.id,
                type: "Female",
            },
        });
    }

    const regions = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
    ];

    for (const region of regions) {
        await prisma.region.upsert({
            where: { name: region },
            update: {},
            create: { name: region },
        });
    }

    const categories = [
        "Mythology",
        "Folklore",
        "Tribal Legend",
        "Urban Legend",
        "Moral Tale",
        "Epic Story",
        "Oral History",
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
        });
    }

    console.log("Seed data inserted successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
