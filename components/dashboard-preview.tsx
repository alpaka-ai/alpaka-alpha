import Image from "next/image"

export function DashboardPreview() {
    return (
        <div className="relative w-full max-w-md mx-auto rounded-lg shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#606C38]/80 to-[#DDA15E]/80 opacity-20 rounded-lg"></div>
            <Image
                src="/real-estate-carbon-dashboard.png"
                alt="Alpaka Dashboard Preview"
                width={500}
                height={400}
                className="rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-white font-['Chau_Philomene_One'] text-lg">Supply Chain Savings</div>
                        <div className="text-[#DDA15E] font-bold text-2xl">$1.2M</div>
                    </div>
                    <div>
                        <div className="text-white font-['Chau_Philomene_One'] text-lg">Emissions Reduced</div>
                        <div className="text-[#606C38] font-bold text-2xl">24%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
