'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useVehicle } from '@/components/providers/VehicleContext';

const VEHICLE_DATA = {
    BMW: {
        models: ['M3', 'M4', 'M5', 'X5M'],
        years: ['2024', '2023', '2022', '2021'],
    },
    Tesla: {
        models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
        years: ['2024', '2023', '2022'],
    },
    Audi: {
        models: ['A3', 'RS3', 'RS6', 'R8', 'e-tron GT'],
        years: ['2024', '2023', '2022'],
    }
};

type Brand = keyof typeof VEHICLE_DATA;

export function VehicleSelector() {

    const { vehicle, setVehicle, clearVehicle } = useVehicle();
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Local state for the wizard steps before confirmation
    const [tempBrand, setTempBrand] = useState<Brand | null>(null);
    const [tempModel, setTempModel] = useState<string | null>(null);

    const handleBrandSelect = (b: Brand) => {
        setTempBrand(b);
        setStep(2);
    };

    const handleModelSelect = (m: string) => {
        setTempModel(m);
        setStep(3);
    };

    const handleYearSelect = (y: string) => {
        if (tempBrand && tempModel) {
            setVehicle({
                brand: tempBrand,
                model: tempModel,
                year: y
            });
        }
    };

    const reset = () => {
        clearVehicle();
        setStep(1);
        setTempBrand(null);
        setTempModel(null);
    };

    if (vehicle) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Check size={20} />
                    </div>
                    <div>
                        <div className="text-xs uppercase text-gray-500 font-bold mb-1">My Garage</div>
                        <div className="text-lg font-bold text-gray-900">{vehicle.year} {vehicle.brand} {vehicle.model}</div>
                    </div>
                </div>
                <button onClick={reset} className="text-sm text-blue-600 hover:underline">Change</button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-lg relative overflow-hidden shadow-sm">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-gray-100 w-full">
                <motion.div
                    className="h-full bg-orange-500"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Select Your Vehicle <ChevronRight className="text-orange-500" size={20} />
            </h2>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {Object.keys(VEHICLE_DATA).map((b) => (
                            <button
                                key={b}
                                onClick={() => handleBrandSelect(b as Brand)}
                                className="p-3 bg-gray-50 border border-gray-200 hover:border-orange-500 hover:bg-white text-gray-800 font-bold transition-all rounded text-sm"
                            >
                                {b}
                            </button>
                        ))}
                    </motion.div>
                )}

                {step === 2 && tempBrand && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {VEHICLE_DATA[tempBrand].models.map((m) => (
                            <button
                                key={m}
                                onClick={() => handleModelSelect(m)}
                                className="p-3 bg-gray-50 border border-gray-200 hover:border-orange-500 hover:bg-white text-gray-800 font-bold transition-all rounded text-sm"
                            >
                                {m}
                            </button>
                        ))}
                    </motion.div>
                )}

                {step === 3 && tempBrand && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {VEHICLE_DATA[tempBrand].years.map((y) => (
                            <button
                                key={y}
                                onClick={() => handleYearSelect(y)}
                                className="p-3 bg-gray-50 border border-gray-200 hover:border-orange-500 hover:bg-white text-gray-800 font-bold transition-all rounded text-sm"
                            >
                                {y}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-6 text-xs text-gray-400 text-center flex items-center justify-center gap-4">
                <span>Step {step} of 3</span>
                {step > 1 && <button onClick={() => setStep(s => s - 1 as any)} className="text-blue-600 hover:underline">Back</button>}
            </div>
        </div>
    );
}
