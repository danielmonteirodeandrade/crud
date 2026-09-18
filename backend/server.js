const PORT = process.env.PORT;
const app = require("./backend/app.js");

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});