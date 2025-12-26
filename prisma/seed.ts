import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INITIAL_PRODUCTS = [
    {
        name: "RS3 Style Grille (Audi A3 8Y)",
        category: "bodywork",
        price: 45000,
        image: "/products/grille-rs3.png",
        description: "Honeycomb mesh grille in gloss black. Direct replacement for OEM grille.",
        brand: "TOLI Performance",
        sku: "BW-001",
        inStock: true,
        stockCount: 15,
        rating: 4.8,
        reviews: 12,
        model3d: "grille",
        compatibility: [
            { make: "Audi", model: "A3", years: [2021, 2022, 2023, 2024] },
            { make: "Audi", model: "S3", years: [2021, 2022, 2023, 2024] }
        ]
    },
    {
        name: "M4 Style Carbon Spoiler",
        category: "carbon fiber",
        price: 32000,
        image: "/products/spoiler-m4.png",
        description: "Real dry carbon fiber spoiler. High kick styling for aggressive look.",
        brand: "Vorsteiner",
        sku: "CF-002",
        inStock: true,
        stockCount: 8,
        rating: 5.0,
        reviews: 5,
        model3d: "spoiler",
        compatibility: [
            { make: "BMW", model: "3 Series", years: [2019, 2020, 2021, 2022, 2023] },
            { make: "BMW", model: "4 Series", years: [2020, 2021, 2022, 2023] }
        ]
    },
    {
        name: "Laser LED Headlights (Audi A3 8Y)",
        category: "headlights",
        price: 185000, // Updated price in DA
        image: "/products/headlight-audi.png",
        description: "Matrix LED headlights with dynamic turn signals and blue laser accent.",
        brand: "OEM Plus",
        sku: "HL-003",
        inStock: true,
        stockCount: 4,
        rating: 4.9,
        reviews: 3,
        model3d: "headlight",
        compatibility: [
            { make: "Audi", model: "A3", years: [2021, 2022, 2023, 2024] }
        ]
    }
];

async function main() {
    console.log('Start seeding ...');

    for (const p of INITIAL_PRODUCTS) {
        const product = await prisma.product.create({
            data: p,
        });
        console.log(`Created product with id: ${product.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
