import { type SchemaTypeDefinition } from 'sanity'

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
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
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