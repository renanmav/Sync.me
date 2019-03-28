const generateSlug = require('../../../server/utils/slugify');

const MockUser = {
  slugs: ['renan-machado', 'renan-machado-1', 'renan'],
  findOne({ slug }) {
    if (this.slugs.includes(slug)) {
      return Promise.resolve({ id: 'id' });
    }

    return Promise.resolve(null);
  },
};

describe('slugify', () => {
  test('no duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Renan Machado Alves Vaz').then((slug) => {
      expect(slug).toBe('renan-machado-alves-vaz');
    });
  });

  test('one duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Renan').then((slug) => {
      expect(slug).toBe('renan-1');
    });
  });

  test('multiple duplications', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Renan Machado').then((slug) => {
      expect(slug).toBe('renan-machado-2');
    });
  });
});
