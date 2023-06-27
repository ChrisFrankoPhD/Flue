const express = require('express')
const app = express()
port = 5000 

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
})