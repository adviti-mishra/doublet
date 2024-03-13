import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aumrhcgaoxyiatvltsfx.supabase.co";
const supabaseKey = process.env.SUPABASE_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
