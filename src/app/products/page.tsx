export default function ProductsPage() {
  const products = [
    { id: 1, name: "Laptop", price: 55000, image: "https://picsum.photos/300?1" },
    { id: 2, name: "Headphones", price: 2000, image: "https://picsum.photos/300?2" },
    { id: 3, name: "Shoes", price: 3000, image: "https://picsum.photos/300?3" },
    { id: 4, name: "Watch", price: 2500, image: "https://picsum.photos/300?4" },
    { id: 5, name: "Phone", price: 20000, image: "https://picsum.photos/300?5" },
    { id: 6, name: "Backpack", price: 1500, image: "https://picsum.photos/300?6" },
    { id: 7, name: "Sunglasses", price: 1200, image: "https://picsum.photos/300?7" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-gray-100 p-8">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Our Products
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover rounded-xl"
            />

            <h3 className="text-lg font-semibold mt-3">{p.name}</h3>

            <p className="text-indigo-600 font-bold mt-1">
              ₹{p.price}
            </p>

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700">
              Buy Now
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}