import Image from "next/image"

export default function MapPage() {
  return (
    <section className="py-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Campus Map</h1>
        <p className="text-muted-foreground">
          Explore our campus layout and facilities
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="max-w-4xl w-full">
          <Image
            src="/map.png"
            alt="Campus Map showing buildings, cricket ground, swimming pools, and facilities"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg border"
            priority
          />
        </div>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Interactive campus map with all major buildings and facilities</p>
      </div>
    </section>
  )
}
