import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { customer } from './schema/customer';
import { user } from './schema/user';
import { journal } from './schema/journal';

async function main() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema: { customer, user, journal }, logger: true });

  const [insertedCustomer] = await db
    .insert(customer)
    .values({ name: 'test customer' })
    .returning({ id: customer.id });

  const [insertedUser] = await db
    .insert(user)
    .values({ username: 'teszt', customerId: insertedCustomer.id })
    .returning({ id: user.id });

  const [insertedJournal] = await db
    .insert(journal)
    .values({ name: 'teszt', userId: insertedUser.id })
    .returning({ id: journal.id });
}

main()
  .then(() => {
    console.log('✅ Seed successful');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed failed');
    console.error(err);
    process.exit(1);
  });
