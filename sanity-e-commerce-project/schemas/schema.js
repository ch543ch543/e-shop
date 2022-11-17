import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { localeString } from './localeString';
import product from './product';
import banner from './banner';
import productCat from './productCat';
import productType from './productType';
import users from './users';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ localeString, productCat, productType, product, banner, users ]),
})