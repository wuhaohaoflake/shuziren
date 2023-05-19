export default {
  UserName: {
    props: {
      id: 'username',
    },
    rules: [
      {
        required: true,
        message: 'username',
      },
    ],
  },
  Password: {
    props: {
      id: 'password',
    },
    rules: [
      {
        required: true,
        message: 'password',
      },
    ],
  },
};
