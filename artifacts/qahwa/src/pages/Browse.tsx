import { useAppContext } from "../context/AppContext";
import { CafeCard } from "../components/CafeCard";

export default function Browse() {
  const { shops } = useAppContext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Curated Corners
          </h1>
          <p className="text-lg text-secondary max-w-2xl font-serif">
            Discover the quiet spots, the perfect brews, and the corners where time slows down.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {shops.map((shop) => (
            <CafeCard key={shop.id} shop={shop} />
          ))}
        </div>
      </main>
    </div>
  );
}
