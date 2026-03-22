import Link from "next/link";
import { faqCategories } from "@/data/faq";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {

  const { category: categoryId } = await params;

  const category = faqCategories.find(
    (c) => c.id === categoryId
  );

  if (!category) {
    return <div className="p-10">Category not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-4xl font-black mb-10">
        {category.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {category.articles.map((article) => (

          <Link
            key={article.slug}
            href={`/faq/${category.id}/${article.slug}`}
            className="bg-gray-100 p-6 rounded-2xl  hover:bg-gray-200 transition flex flex-col justify-between min-h-[150px]">

            <p className="font-semibold text-lg">
              {article.title}
            </p>

            <span className="text-sm text-gray-500">
              Читать →
            </span>

          </Link>

        ))}

      </div>

    </div>
  );
}