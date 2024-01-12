import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const customer = pgTable('customer', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull().unique(),
});
