const express = require('express');

const app = express();

app.get('/getServer', (req, res) => {
    const serverURL = req.get('host');
    res.json({ code: 200, server: serverURL });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
