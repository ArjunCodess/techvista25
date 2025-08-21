import { type SchemaTypeDefinition } from 'sanity'

const SECTION_OPTIONS = [
  'senior',
  'junior',
  'primary',
  'pre-primary',
] as const

const CLASS_OPTIONS = [
  'montessori',
  'nursery',
  'kindergarten',
  'class 1',
  'class 2',
  'class 3',
  'class 4',
  'class 5',
  'class 6',
  'class 7',
  'class 8',
  'class 9',
  'class 10',
  'class 11',
  'class 12',
] as const

const organisation: SchemaTypeDefinition = {
  name: 'organisation',
  title: 'Organisation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}

const post: SchemaTypeDefinition = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: Array.from(SECTION_OPTIONS) },
    },
    {
      name: 'organisation',
      title: 'Organisation',
      type: 'reference',
      to: [{ type: 'organisation' }],
    },
    {
      name: 'classes',
      title: 'Classes',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: Array.from(CLASS_OPTIONS) },
      initialValue: () => Array.from(CLASS_OPTIONS),
    },
    {
      name: 'filesMedia',
      title: 'Files / Media',
      type: 'array',
      of: [
        { type: 'image' },
        { type: 'file' },
      ],
    },
  ],
}

const lostAndFound: SchemaTypeDefinition = {
  name: 'lostAndFound',
  title: 'Lost & Found',
  type: 'document',
  fields: [
    {
      name: 'lost',
      title: 'Lost Item Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Details',
      type: 'text',
    },
    {
      name: 'found',
      title: 'Found',
      type: 'boolean',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
  ],
}

const poll: SchemaTypeDefinition = {
  name: 'poll',
  title: 'Poll',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      validation: (Rule) => Rule.min(2).max(10),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [organisation, post, lostAndFound, poll],
}