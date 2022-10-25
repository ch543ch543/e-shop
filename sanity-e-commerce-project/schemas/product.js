import { baseLanguage, localeString } from './localeString';
import { client } from '../../lib/client'; 

// const productCat = async () => {
//   const query = '*[_type == "product_cat"]';
  
//   const productsCatList = await client.fetch(query)
//   .then(res => res.map(cat => ({
//       title: cat.name, 
//       value: cat.name.toLowerCase().split(' ').join('-')
//     })))
  
//   return productsCatList
// }

export default {
  name: 'product',
  title: 'Product',
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
      type: 'localeString',
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
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Mini-hoops', value: 'mini-hoops'},
          {title: 'Adjustable', value: 'adjustable'},
          {title: 'Simples', value: 'simples'},
          {title: 'Bracelets', value: 'bracelets'},
          {title: 'Earcuff', value: 'earcuff'}
        ]
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`
    }
  }
}