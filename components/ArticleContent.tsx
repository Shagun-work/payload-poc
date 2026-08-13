// components/ArticleContent.tsx
'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { Article } from '@/payload-types'

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => {
  const converters: any = { ...defaultConverters }

  // Implement listitem ourselves for both branches, rather than delegating to
  // defaultConverters.listitem — calling it directly as a plain function doesn't
  // return JSX the way you'd expect, since it isn't meant to be invoked manually.
  converters.listitem = ({ node, nodesToJSX }: any) => {
    if (node.checked === undefined) {
      // plain (non-checklist) list item
      return <li>{nodesToJSX({ nodes: node.children })}</li>
    }

    // checklist item — use a stable id derived from the node's own key,
    // instead of Math.random()/crypto.randomUUID(), to avoid hydration mismatches
    const stableId = `checklist-${node.__key ?? node.key ?? ''}`

    return (
      <li aria-checked={node.checked} className="list-item-checkbox" role="checkbox">
        <input id={stableId} checked={node.checked} readOnly type="checkbox" />
        <label htmlFor={stableId}>{nodesToJSX({ nodes: node.children })}</label>
      </li>
    )
  }

  return converters
}

export function ArticleContent({
  initialData,
}: {
  initialData: Article
}) {
  const { data } = useLivePreview<Article>({
    initialData,
    serverURL:
      process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
    depth: 2,
  })

  const article = data ?? initialData

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">
        {article.title}
      </h1>

      {article.description && (
        <p className="mt-4 text-lg">
          {article.description}
        </p>
      )}

      <article className="richtext mt-10">
        <RichText
          data={article.content}
          converters={jsxConverters}
        />
      </article>
    </main>
  )
}