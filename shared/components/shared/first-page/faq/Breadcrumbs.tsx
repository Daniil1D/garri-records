import Link from "next/link"

export const Breadcrumbs = ({
  category,
  article
}:{
  category:string
  article:string
}) => {
  return (
    <div className="text-sm text-gray-500 mb-6">

      <Link href="/faq">FAQ</Link>
      {" / "}
      <span>{category}</span>
      {" / "}
      <span className="text-black">{article}</span>

    </div>
  )
}