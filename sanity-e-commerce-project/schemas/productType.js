export default {
  name: 'productType',
  title: 'Product Type',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{
        type: 'image'
      }],
      options: {
        hotspot: true,
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Earrings', value: 'earrings'},
          {title: 'Necklaces', value: 'necklaces'},
          {title: 'Rings', value: 'rings'},
          {title: 'Bracelets', value: 'bracelets'}
        ]
      }
    },
  ],
}