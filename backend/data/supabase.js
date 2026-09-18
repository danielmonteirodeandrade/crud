const {createClient} = require("@supabase/supabase-js");

const supabaseUrl = process.env.supabaseurl;
const supabaseKey = process.env.supabasekey;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;