
const app = express();
const router = require("./routes/router")




// mount the router on the app
app.use('/', router)