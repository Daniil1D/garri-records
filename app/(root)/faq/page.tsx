import Link from "next/link"

import {
  Container,
  Header,
  Footer,
} from "@/shared/components/shared/first-page"

import { Title } from "@/shared/components/shared/title"

import { faqCategories } from "@/data/faq"

export default function FAQPage() {
  return (
    <Container>

      <Header />

      <section className="mt-10 md:mt-14 lg:mt-16">

        <Title
          text="FAQ"
          size="4xl"
          className="font-black mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {faqCategories.map((category) => (

            <Link
              key={category.id}
              href={`/faq/${category.id}`}

              className="
                bg-gray-100
                p-6
                rounded-2xl
                hover:bg-gray-200
                transition
                flex
                flex-col
                justify-between
                min-h-[160px]
              "
            >

              <h2 className="text-lg font-semibold">
                {category.title}
              </h2>

              <span className="text-sm text-gray-500 mt-6">
                {category.articles.length} статей →
              </span>

            </Link>

          ))}

        </div>

      </section>

      <Footer />

    </Container>
  )
}