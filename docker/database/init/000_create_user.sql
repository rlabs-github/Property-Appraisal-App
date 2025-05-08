-- Create 'postgres' user explicitly (if needed)
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres'
   ) THEN
      CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';
   END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE appraisal_db TO postgres;