import { pgTable, serial, varchar, text, timestamp, integer, decimal, date, boolean, json } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { teams } from "./schema"

// Vendors that contribute to emissions
export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }),
  contactName: varchar("contact_name", { length: 100 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  address: text("address"),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Emission sources (e.g., electricity, transportation, materials)
export const emissionSources = pgTable("emission_sources", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description"),
  unit: varchar("unit", { length: 20 }).notNull(), // e.g., kWh, km, kg
  emissionFactor: decimal("emission_factor", { precision: 10, scale: 4 }), // CO2e per unit
  scope: integer("scope").notNull(), // 1, 2, or 3
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Emission data entries
export const emissionEntries = pgTable("emission_entries", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  vendorId: integer("vendor_id").references(() => vendors.id),
  sourceId: integer("source_id")
    .notNull()
    .references(() => emissionSources.id),
  quantity: decimal("quantity", { precision: 15, scale: 4 }).notNull(),
  date: date("date").notNull(),
  notes: text("notes"),
  verificationStatus: varchar("verification_status", { length: 20 }).default("pending"),
  verifiedBy: integer("verified_by").references(() => teams.id),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  metadata: json("metadata"), // For any additional data
})

// Reduction targets
export const reductionTargets = pgTable("reduction_targets", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  baselineYear: integer("baseline_year").notNull(),
  targetYear: integer("target_year").notNull(),
  percentageReduction: decimal("percentage_reduction", { precision: 5, scale: 2 }).notNull(),
  scope: integer("scope"), // 1, 2, or 3, null means all scopes
  sourceId: integer("source_id").references(() => emissionSources.id), // null means all sources
  status: varchar("status", { length: 20 }).default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Reduction initiatives
export const reductionInitiatives = pgTable("reduction_initiatives", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  targetId: integer("target_id").references(() => reductionTargets.id),
  startDate: date("start_date"),
  endDate: date("end_date"),
  status: varchar("status", { length: 20 }).default("planned"),
  estimatedReduction: decimal("estimated_reduction", { precision: 15, scale: 4 }),
  actualReduction: decimal("actual_reduction", { precision: 15, scale: 4 }),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  roi: decimal("roi", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Relations
export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  team: one(teams, {
    fields: [vendors.teamId],
    references: [teams.id],
  }),
  emissionEntries: many(emissionEntries),
}))

export const emissionSourcesRelations = relations(emissionSources, ({ many }) => ({
  emissionEntries: many(emissionEntries),
  reductionTargets: many(reductionTargets),
}))

export const emissionEntriesRelations = relations(emissionEntries, ({ one }) => ({
  team: one(teams, {
    fields: [emissionEntries.teamId],
    references: [teams.id],
  }),
  vendor: one(vendors, {
    fields: [emissionEntries.vendorId],
    references: [vendors.id],
  }),
  source: one(emissionSources, {
    fields: [emissionEntries.sourceId],
    references: [emissionSources.id],
  }),
}))

export const reductionTargetsRelations = relations(reductionTargets, ({ one, many }) => ({
  team: one(teams, {
    fields: [reductionTargets.teamId],
    references: [teams.id],
  }),
  source: one(emissionSources, {
    fields: [reductionTargets.sourceId],
    references: [emissionSources.id],
  }),
  initiatives: many(reductionInitiatives),
}))

export const reductionInitiativesRelations = relations(reductionInitiatives, ({ one }) => ({
  team: one(teams, {
    fields: [reductionInitiatives.teamId],
    references: [teams.id],
  }),
  target: one(reductionTargets, {
    fields: [reductionInitiatives.targetId],
    references: [reductionTargets.id],
  }),
}))

// Types
export type Vendor = typeof vendors.$inferSelect
export type NewVendor = typeof vendors.$inferInsert
export type EmissionSource = typeof emissionSources.$inferSelect
export type NewEmissionSource = typeof emissionSources.$inferInsert
export type EmissionEntry = typeof emissionEntries.$inferSelect
export type NewEmissionEntry = typeof emissionEntries.$inferInsert
export type ReductionTarget = typeof reductionTargets.$inferSelect
export type NewReductionTarget = typeof reductionTargets.$inferInsert
export type ReductionInitiative = typeof reductionInitiatives.$inferSelect
export type NewReductionInitiative = typeof reductionInitiatives.$inferInsert
