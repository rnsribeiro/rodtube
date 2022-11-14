import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://quuxgkmoqxxbhsubdfvc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dXhna21vcXh4YmhzdWJkZnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MTg3NjgsImV4cCI6MTk4Mzk5NDc2OH0.ghuB4iqz_rn8Jf6SrX1b0EQL8nvpT_Qjv4bXnCA0vEo";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}