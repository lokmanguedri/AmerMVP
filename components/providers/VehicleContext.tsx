'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Vehicle {
    brand: string;
    model: string;
    year: string;
}

interface VehicleContextType {
    vehicle: Vehicle | null;
    setVehicle: (vehicle: Vehicle | null) => void;
    clearVehicle: () => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    // Persist vehicle selection in localStorage
    useEffect(() => {
        const savedVehicle = localStorage.getItem('toli_vehicle');
        if (savedVehicle) {
            try {
                setVehicle(JSON.parse(savedVehicle));
            } catch (e) {
                console.error("Failed to load vehicle selection", e);
            }
        }
    }, []);

    useEffect(() => {
        if (vehicle) {
            localStorage.setItem('toli_vehicle', JSON.stringify(vehicle));
        } else {
            localStorage.removeItem('toli_vehicle');
        }
    }, [vehicle]);

    const clearVehicle = () => setVehicle(null);

    return (
        <VehicleContext.Provider value={{ vehicle, setVehicle, clearVehicle }}>
            {children}
        </VehicleContext.Provider>
    );
}

export function useVehicle() {
    const context = useContext(VehicleContext);
    if (context === undefined) {
        throw new Error('useVehicle must be used within a VehicleProvider');
    }
    return context;
}
