CREATE TABLE IF NOT EXISTS startup_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  startup_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  current_stage TEXT NOT NULL,
  startup_description TEXT NOT NULL,
  target_customer TEXT NOT NULL,
  main_challenge TEXT NOT NULL,
  questions_for_room TEXT NOT NULL,
  available_for_event INTEGER NOT NULL CHECK (available_for_event IN (0, 1)),
  additional_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_startup_applications_created_at
ON startup_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_startup_applications_email
ON startup_applications (email);
