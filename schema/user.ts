import { serial, pgTable, text } from 'drizzle-orm/pg-core';
import { customer } from './customer';
import { createId } from '@paralleldrive/cuid2';

export const user = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(createId),
  username: text('username').notNull().unique(),
  customerId: text('customerId')
    .notNull()
    .references(() => customer.id),
});
