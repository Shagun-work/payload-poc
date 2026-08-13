// payload-types.ts
export interface Article {
  id: number
  title: string
  slug?: string | null
  description: string
  content: any
  author?: string | null
  topics?: { topic?: string | null; id?: string | null }[] | null
  industries?: { industry?: string | null; id?: string | null }[] | null
  capabilities?: { capability?: string | null; id?: string | null }[] | null
  summary?: string | null
  keyQuestions?: { question?: string | null; answer?: string | null; id?: string | null }[] | null
  publishedDate?: string | null
  _status?: 'draft' | 'published' | null
  updatedAt: string
  createdAt: string
}

export interface Config {
  collections: {
    articles: Article
  }
}