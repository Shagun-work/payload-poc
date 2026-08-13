import { getPayload } from 'payload'
import config from '@/payload-config'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { ArticleContent } from '@/components/ArticleContent'
import { Article } from '@/payload-types'
import { DraftModeBanner } from '@/components/DraftModeBanner'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// app/(frontend)/articles/[slug]/page.tsx (server component, as you have it)
// app/(frontend)/articles/[slug]/page.tsx
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    draft: isDraftMode,
    overrideAccess: true,
    limit: 1,
    })

    const article = result.docs[0] as Article
    if (!article) notFound()

  return (
    <>
      <DraftModeBanner isDraftMode={isDraftMode} />
      <ArticleContent initialData={article} />
    </>
  )
}