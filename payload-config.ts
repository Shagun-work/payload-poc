import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/users'
import { Articles } from './collections/articles'

export default buildConfig({
  admin: {
    user: Users.slug,
  },

  collections: [
    Users,
    Articles,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  // cors: [
  //   'https://localhost:3000',
  // ],

  // csrf: [
  //   'https://localhost:3000',
  // ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
})