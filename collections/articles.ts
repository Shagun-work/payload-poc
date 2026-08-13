import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Manage website articles and their AEO/GEO content.',
    defaultColumns: ['title', 'status', 'publishedDate', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    preview: ({ slug }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?slug=${slug}`
    },
    livePreview: {
        url: ({ data }) => {
        const slug = data?.slug

        return `articles/${slug}`
        },
    },
  },

  versions: {
    drafts: true,
    maxPerDoc: 20,
  },

  fields: [
    // Basic article information
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    slugField({
      useAsSlug: 'title',
    }),

    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description/summary of the article.',
      },
    },

    // Main article content
    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    // Author
    {
      name: 'author',
      type: 'text',
    },

    // Categorisation
    {
      name: 'topics',
      type: 'array',
      fields: [
        {
          name: 'topic',
          type: 'text',
        },
      ],
    },

    {
      name: 'industries',
      type: 'array',
      fields: [
        {
          name: 'industry',
          type: 'text',
        },
      ],
    },

    {
      name: 'capabilities',
      type: 'array',
      fields: [
        {
          name: 'capability',
          type: 'text',
        },
      ],
    },

    // AEO / GEO specific content
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description:
          'Concise answer-oriented summary that can be used by AI/search systems.',
      },
    },

    {
      name: 'keyQuestions',
      type: 'array',
      admin: {
        description:
          'Questions that this article directly answers.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'textarea',
        },
      ],
    },

    // Publishing information
    {
      name: 'publishedDate',
      type: 'date',
    },
  ],
}