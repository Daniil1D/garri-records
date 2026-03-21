import { faqCategories } from "@/data/faq";
import { Breadcrumbs } from "@/shared/components/shared/first-page/faq/Breadcrumbs";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {

  const { category, slug } = await params;

  const categoryData = faqCategories.find((c) => c.id === category);

  if (!categoryData) {
    return <div className="p-10">Category not found</div>;
  }

  const article = categoryData.articles.find((a) => a.slug === slug);

  if (!article) {
    return <div className="p-10">Article not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">

      <Breadcrumbs
        category={categoryData.title}
        article={article.title}
      />

      <h1 className="text-3xl font-bold mb-8">
        {article.title}
      </h1>

      <div className="prose max-w-none whitespace-pre-line">
        {article.content}
      </div>

    </div>
  );
}