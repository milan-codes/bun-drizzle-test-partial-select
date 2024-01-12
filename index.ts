import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { customer } from './schema/customer';
import { user } from './schema/user';
import { journal } from './schema/journal';
import { eq } from 'drizzle-orm';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema: { customer, user, journal }, logger: true });

const journals = await db
  .select({
    id: journal.id,
    name: journal.name,
    user: {
      id: user.id,
      name: user.username,
      customer: {
        id: customer.id,
        name: customer.name,
      },
    },
  })
  .from(journal)
  .leftJoin(user, eq(user.id, journal.userId))
  .leftJoin(customer, eq(customer.id, user.customerId));

console.log(journals);
