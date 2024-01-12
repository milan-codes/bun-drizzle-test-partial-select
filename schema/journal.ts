import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { user } from './user';

export const journal = pgTable('journal', {
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
});
