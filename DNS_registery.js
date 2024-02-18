const express = require('express');
import { LearningPackage, LearningFact } from "./DB_connection";

const app = express();
const PORT= 3000;

app.use(express.json())

app.get('/getServer', (req, res) => {
    const serverURL = req.protocol + '://' + req.get('host');
    res.json({ code: 200, server: serverURL });
});

//const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
