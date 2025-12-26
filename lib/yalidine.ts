const API_URL = "https://api.yalidine.com/v1";

export interface YalidineWilaya {
    id: number;
    name: string;
}

export interface YalidineCommune {
    id: number;
    name: string;
    wilaya_id: number;
}

export interface ShippingRate {
    wilaya_id: number;
    fee: number;
}

// Temporary static data for fallback/dev without API keys
const MOCK_WILAYAS = [
    { id: 1, name: "Adrar" }, { id: 16, name: "Algiers" }, { id: 31, name: "Oran" }, { id: 25, name: "Constantine" }, { id: 19, name: "Setif" }
];

const MOCK_COMMUNES: Record<number, YalidineCommune[]> = {
    16: [{ id: 1, name: "Alger Centre", wilaya_id: 16 }, { id: 2, name: "Sidi M'Hamed", wilaya_id: 16 }],
    31: [{ id: 3, name: "Oran Centre", wilaya_id: 31 }, { id: 4, name: "Es Senia", wilaya_id: 31 }],
};

export const YalidineService = {
    async getWilayas(): Promise<YalidineWilaya[]> {
        // In production: const res = await fetch(`${API_URL}/wilayas`, { headers: getHeaders() });
        // return res.json();
        return new Promise(resolve => setTimeout(() => resolve(MOCK_WILAYAS), 500));
    },

    async getCommunes(wilayaId: number): Promise<YalidineCommune[]> {
        // In production: const res = await fetch(`${API_URL}/communes?wilaya_id=${wilayaId}`, ...);
        return new Promise(resolve => setTimeout(() => resolve(MOCK_COMMUNES[wilayaId] || []), 300));
    },

    async calculateShipping(wilayaId: number): Promise<number> {
        // Shipping Logic: 
        // Algiers (16) = 400 DA
        // Major Cities (31, 25, 19) = 600 DA
        // Others = 900 DA
        if (wilayaId === 16) return 400;
        if ([31, 25, 19].includes(wilayaId)) return 600;
        return 900;
    },

    async createParcel(orderData: any) {
        console.log("Creating Yalidine Parcel for:", orderData);
        // Implement API call to POST /parcels
        const tracking = `YAL-${Math.floor(Math.random() * 100000)}`;
        return {
            tracking,
            labelUrl: `https://api.yalidine.com/v1/parcels/${tracking}/label` // Mock URL
        };
    }
};

function getHeaders() {
    return {
        "X-API-ID": process.env.YALIDINE_API_ID || "",
        "X-API-TOKEN": process.env.YALIDINE_API_TOKEN || "",
        "Content-Type": "application/json"
    };
}
