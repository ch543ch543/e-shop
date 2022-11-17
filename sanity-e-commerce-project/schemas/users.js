export default {
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
      {
          name: 'name',
          title: 'Name',
          type: 'string',
      },
      {
          name: 'email',
          title: 'Email',
          type: 'string',
      },
      {
          name: 'password',
          title: 'Password',
          type: 'string',
      },
      {
          name: 'isAdmin',
          title: 'Is Admin',
          type: 'boolean',
      },
  ],
};