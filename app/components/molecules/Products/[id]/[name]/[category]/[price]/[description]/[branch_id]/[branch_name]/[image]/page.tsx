import Image from "next/image";
import Link from "next/link";


export default function page({ params }: {
  params: {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    image: string;
    branch_id: string;
    branch_name: string;
  }
}
) {

  const decodedName = decodeURIComponent(params.name);
  const decodedDescription = decodeURIComponent(params.description);
  const decodedBranchName = decodeURIComponent(params.branch_name);


  return (
    <>
      <title>{`Product ${decodedName}`}</title>
      <div className="min-h-screen bg-[#FDF6EC] p-8">
        <div
          className="absolute top-0 left-0 w-full h-64 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #8B4513, #8B4513 10px, transparent 10px, transparent 50px)",
          }}
        />

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-[650px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-amber-100/20" />
              <Image
                src={`http://127.0.0.1:8000/api/storage/${params.image}`}
                alt={`Product-${decodedName}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rotate-12">
                <div className="w-full h-full bg-orange-800/10 rounded-full" />
              </div>
            </div>

            <div className="p-12 relative">
              <div className="inline-flex items-center px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
                <span className="text-orange-700 text-sm font-medium">
                  {params.category}
                </span>
              </div>

              <h1 className="mt-8 text-4xl font-serif font-bold text-gray-800">
                {decodedName}
              </h1>

              <div className="mt-6 flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-orange-600">
                  ₱{params.price}.00
                </span>
              </div>

              <div className="mt-8 relative">
                <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-orange-200" />
                <p className="text-gray-600 leading-relaxed pl-4">
                  {decodedDescription}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 p-4 bg-orange-50/50 rounded-xl">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Product ID</p>
                  <p className="font-mono text-sm text-gray-700">{params.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium text-sm text-gray-700">
                    {params.category}
                  </p>
                </div>
              </div>
              <div className=" mt-32 float-right space-y-1">
                <Link
                  href={{
                    pathname: "/components/organisms/OrderPage",
                    query: {
                      id: params.id,
                      name: decodedName,
                      description: decodedDescription,
                      price: params.price,
                      image: params.image,
                      branch_id: params.branch_id,
                      branch_name: decodedBranchName,
                    },
                  }}
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add to cart
                </Link>
              </div>

              <div className="absolute top-4 right-4 w-32 h-32 bg-orange-100/30 rounded-full blur-2xl -z-10" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-amber-100/30 rounded-full blur-xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
