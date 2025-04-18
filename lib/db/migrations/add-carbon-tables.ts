import { sql } from "drizzle-orm"
import { db } from "../drizzle"

export async function createCarbonTables() {
  console.log("Creating carbon management tables...")

  // Create vendors table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS vendors (
      id SERIAL PRIMARY KEY,
      team_id INTEGER NOT NULL REFERENCES teams(id),
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50),
      contact_name VARCHAR(100),
      contact_email VARCHAR(255),
      contact_phone VARCHAR(50),
      address TEXT,
      notes TEXT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

  // Create emission_sources table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS emission_sources (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      unit VARCHAR(20) NOT NULL,
      emission_factor DECIMAL(10, 4),
      scope INTEGER NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

  // Create emission_entries table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS emission_entries (
      id SERIAL PRIMARY KEY,
      team_id INTEGER NOT NULL REFERENCES teams(id),
      vendor_id INTEGER REFERENCES vendors(id),
      source_id INTEGER NOT NULL REFERENCES emission_sources(id),
      quantity DECIMAL(15, 4) NOT NULL,
      date DATE NOT NULL,
      notes TEXT,
      verification_status VARCHAR(20) DEFAULT 'pending',
      verified_by INTEGER REFERENCES teams(id),
      verified_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      metadata JSONB
    );
  `)

  // Create reduction_targets table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS reduction_targets (
      id SERIAL PRIMARY KEY,
      team_id INTEGER NOT NULL REFERENCES teams(id),
      name VARCHAR(100) NOT NULL,
      description TEXT,
      baseline_year INTEGER NOT NULL,
      target_year INTEGER NOT NULL,
      percentage_reduction DECIMAL(5, 2) NOT NULL,
      scope INTEGER,
      source_id INTEGER REFERENCES emission_sources(id),
      status VARCHAR(20) DEFAULT 'active',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

  // Create reduction_initiatives table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS reduction_initiatives (
      id SERIAL PRIMARY KEY,
      team_id INTEGER NOT NULL REFERENCES teams(id),
      name VARCHAR(100) NOT NULL,
      description TEXT,
      target_id INTEGER REFERENCES reduction_targets(id),
      start_date DATE,
      end_date DATE,
      status VARCHAR(20) DEFAULT 'planned',
      estimated_reduction DECIMAL(15, 4),
      actual_reduction DECIMAL(15, 4),
      cost DECIMAL(10, 2),
      roi DECIMAL(10, 2),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

  console.log("Carbon management tables created successfully")
}
