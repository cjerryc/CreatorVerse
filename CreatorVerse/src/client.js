import { createClient } from "@supabase/supabase-js";

const URL = "https://mbowvfdvutvsbywrgvfk.supabase.co/rest/v1/";
const API_KEY = "sb_publishable_qQNXVEUfkY826lhU1YpVBw_aYD3K_87";

const supabaseClient = createClient(URL, API_KEY);

export default supabaseClient;



