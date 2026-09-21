require('dotenv').config();

const PORT = process.env.PORT;
const app = require('./backend/app.js');
const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.SUPABASEKEY;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});