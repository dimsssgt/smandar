import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://lmzhlwmklpeomixkwkpu.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_IW38sOyWyJaRUa_YK7bOsg_zY5vLURD",
);