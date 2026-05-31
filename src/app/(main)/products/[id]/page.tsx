import ProductDetailClient from "./productdetailclient";

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    { cache: "no-store" }
  );

  const result = await res.json();
  return result.data;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return <ProductDetailClient product={product} />;
}