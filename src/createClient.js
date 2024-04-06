import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gfiqaejnoxsuknhlmieb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaXFhZWpub3hzdWtuaGxtaWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMTMwNzAsImV4cCI6MjAyNzU4OTA3MH0.mt2VClLDzhf-3Lt_jtMUCdWcqSCey4X5zopVd9WE-l0"
);
