export type Product = {
    id: string;
    name: string;
    category: 'bodywork' | 'lighting' | 'headlights' | 'tail lights' | 'bumpers' | 'mirrors' | 'carbon fiber' | 'clearance';
    price: number;
    image: string;
    description: string;
    brand: string;
    isNew?: boolean;
    inStock?: boolean;
    rating?: number;
    reviews?: number;
    model3d?: string; // Path to .glb file or identifier for 3D viewer
    compatibility: {
        make: string;
        model: string;
        years: number[];
    }[];
};

export const PRODUCTS: Product[] = [
    // Bodywork
    {
        id: 'bw-001',
        name: 'Carbon Fiber Front Splitter (G80/G82)',
        category: 'bodywork',
        price: 185000,
        image: '/placeholder/splitter.png',
        description: 'High-downforce dry carbon fiber splitter for maximum track performance and aggressive aesthetic.',
        brand: 'TOLI Performance',
        isNew: true,
        inStock: true,
        rating: 5,
        reviews: 12,
        model3d: 'splitter',
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    {
        id: 'bw-002',
        name: 'Vented Carbon Hood',
        category: 'bodywork',
        price: 320000,
        image: '/placeholder/hood.png',
        description: 'Ultra-lightweight hood with functional cooling vents. Clear coat finish.',
        brand: 'TOLI Performance',
        inStock: false,
        rating: 4.8,
        reviews: 8,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    // Headlights
    {
        id: 'hl-001',
        name: 'Laser Matrix Headlights - Retrofit Kit',
        category: 'headlights',
        price: 450000,
        image: '/placeholder/headlight.png',
        description: 'Latest generation laser technology with adaptive beam shadowing. Plug and play.',
        brand: 'OEM Plus',
        isNew: true,
        inStock: true,
        rating: 4.9,
        reviews: 45,
        model3d: 'headlight',
        compatibility: [
            { make: 'BMW', model: 'M5', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'X5M', years: [2021, 2022, 2023, 2024] }
        ]
    },
    {
        id: 'hl-002',
        name: 'Blackline LED Headlights',
        category: 'headlights',
        price: 260000,
        image: '/placeholder/headlight-black.png',
        description: 'Smoked internal housing with aggressively styled DRLs.',
        brand: 'TOLI Lighting',
        inStock: true,
        rating: 4.5,
        reviews: 22,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    // Tail Lights
    {
        id: 'tl-001',
        name: 'OLED GTS Tail Lights',
        category: 'tail lights',
        price: 135000,
        image: '/placeholder/taillight.png',
        description: 'Sequenced OLED tail lights with startup animation and dynamic turn signals.',
        brand: 'TOLI Lighting',
        inStock: true,
        rating: 4.7,
        reviews: 156,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    {
        id: 'tl-002',
        name: 'Smoked Euro Tail Lights',
        category: 'tail lights',
        price: 95000,
        image: '/placeholder/taillight-smoke.png',
        description: 'Dark tinted LCI style tail lights for a stealth look.',
        brand: 'Vorsteiner',
        inStock: true,
        rating: 4.2,
        reviews: 34,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] }
        ]
    },
    // Bumpers
    {
        id: 'bp-001',
        name: 'M-Sport Style Front Bumper Conversion',
        category: 'bumpers',
        price: 215000,
        image: '/placeholder/bumper.png',
        description: 'Complete bumper kit including grilles and sensor brackets.',
        brand: 'OEM Plus',
        inStock: true,
        rating: 4.6,
        reviews: 18,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    {
        id: 'bp-002',
        name: 'Rear Diffuser Bumper Extension',
        category: 'bumpers',
        price: 82000,
        image: '/placeholder/diffuser.png',
        description: 'Aggressive rear diffuser extension for quad tipped exhaust setups.',
        brand: 'TOLI Performance',
        inStock: true,
        rating: 4.8,
        reviews: 9,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    // Mirrors
    {
        id: 'mr-001',
        name: 'M-Style Carbon Mirror Caps',
        category: 'mirrors',
        price: 32000,
        image: '/placeholder/mirror.png',
        description: 'Direct replacement dry carbon fiber mirror caps.',
        brand: 'TOLI Performance',
        inStock: true,
        rating: 4.9,
        reviews: 340,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M5', years: [2021, 2022, 2023, 2024] }
        ]
    },
    // Carbon Fiber
    {
        id: 'cf-001',
        name: 'Carbon Fiber Side Skirts',
        category: 'carbon fiber',
        price: 125000,
        image: '/placeholder/skirt.png',
        description: 'Aerodynamic side skirt extensions in 2x2 weave carbon fiber.',
        brand: 'Vorsteiner',
        inStock: true,
        rating: 4.7,
        reviews: 28,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] }
        ]
    },
    {
        id: 'cf-002',
        name: 'Carbon Fiber Interior Trim Kit',
        category: 'carbon fiber',
        price: 165000,
        image: '/placeholder/interior.png',
        description: 'Complete dash and console trim replacement set.',
        brand: 'OEM Plus',
        inStock: true,
        rating: 5,
        reviews: 12,
        compatibility: [
            { make: 'BMW', model: 'M3', years: [2021, 2022, 2023, 2024] },
            { make: 'BMW', model: 'M4', years: [2021, 2022, 2023, 2024] },
            { make: 'Tesla', model: 'Model 3', years: [2022, 2023, 2024] }
        ]
    },
    // Clearance
    {
        id: 'cl-001',
        name: 'Universal Lip Spoiler (Open Box)',
        category: 'clearance',
        price: 12000,
        image: '/placeholder/spoiler-gen.png',
        description: 'Heavily discounted open box item. Minor scratches.',
        brand: 'TOLI Basic',
        inStock: true,
        isNew: false,
        rating: 3.5,
        reviews: 5,
        compatibility: []
    },
    {
        id: 'hl-003',
        name: 'Laser LED Headlights (Audi A3 8Y)',
        category: 'headlights',
        price: 350000,
        image: '/placeholder/headlight-audi.png',
        description: 'Matrix LED headlights with dynamic turn signals specifically for Audi A3.',
        brand: 'OEM Plus',
        inStock: true,
        rating: 5,
        reviews: 3,
        model3d: 'headlight',
        compatibility: [
            { make: 'Audi', model: 'A3', years: [2021, 2022, 2023, 2024] }
        ]
    }
];
