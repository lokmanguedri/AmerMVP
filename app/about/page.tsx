import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-gray-900 text-white py-20">
                <div className="max-w-[1400px] mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Precision Engineering</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We don't just sell parts. We engineer upgrades that transform your vehicle's performance and aesthetics.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 max-w-[1000px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Founded in 2024, ToliParts emerged from a simple frustration: the lack of high-quality, perfectly fitting aftermarket bodywork for modern performance cars.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We bridge the gap between OEM reliability and aggressive aftermarket styling. Every part we sell is 3D scanned and verified for pixel-perfect fitment.
                        </p>
                    </div>
                    <div className="bg-gray-100 h-[400px] rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 font-bold">Workshop Image</span>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-orange-500 py-16 text-white">
                <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-black mb-1">500+</div>
                        <div className="text-sm font-bold uppercase opacity-80">Unique Molds</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-1">50k+</div>
                        <div className="text-sm font-bold uppercase opacity-80">Orders Shipped</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-1">100%</div>
                        <div className="text-sm font-bold uppercase opacity-80">Fitment Guarantee</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-1">24/7</div>
                        <div className="text-sm font-bold uppercase opacity-80">Support Team</div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
