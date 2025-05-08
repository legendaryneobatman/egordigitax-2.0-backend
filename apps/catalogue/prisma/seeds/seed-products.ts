import { PrismaClient, Product } from '.prisma/client';
import { faker } from '@faker-js/faker/locale/ru';
export async function seedProducts(prisma: PrismaClient) {
  const _products = await prisma.product.count();

  if (_products > 0) return;

  const createRandomProduct = (): Omit<Product, 'id'> => {
    const price = Number(faker.commerce.price({ min: 1, max: 10000 }));
    const oldPrice = Number(faker.commerce.price({ min: price, max: 10000 }));
    const discount = Math.floor((price / oldPrice) * 100);
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price,
      oldPrice,
      discount,
      image: faker.image.url(),
    };
  };

  const products = faker.helpers.multiple(createRandomProduct, { count: 500 });

  await prisma.product.createMany({
    data: products,
  });
}
