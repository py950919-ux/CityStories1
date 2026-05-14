import { Link } from "wouter";

export default function Home() {

  const stats = {
    total_cities: "6+",
    total_places: "50+",
    total_contributors: "20+",
    total_users: "100+"
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover the real India
        </h1>
        <p className="text-gray-500 mb-6">
          Curated by locals — not algorithms
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/cities">
            <button className="bg-black text-white px-6 py-3 rounded">
              Explore
            </button>
          </Link>

          <Link href="/contributor">
            <button className="border px-6 py-3 rounded">
              Become Guide
            </button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold">{stats.total_cities}</h2>
          <p>Cities</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{stats.total_places}</h2>
          <p>Places</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{stats.total_contributors}</h2>
          <p>Guides</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{stats.total_users}</h2>
          <p>Users</p>
        </div>
      </section>

    </div>
  );
}
