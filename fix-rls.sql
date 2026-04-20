-- Drop and recreate the insert policy 
DROP POLICY IF EXISTS "Public submit review" ON reviews;

-- Use default (public) role which applies to all including anon
CREATE POLICY "Public submit review" ON reviews 
  FOR INSERT 
  WITH CHECK (true);
