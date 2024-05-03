import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zqchmurjurmhpgmxdrgf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxY2htdXJqdXJtaHBnbXhkcmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1ODU1MDksImV4cCI6MjAzMDE2MTUwOX0.FUwxIV1wBuLv_Zthn2s8J8SvSN1xG-fl54FHStXHwgA"
);
