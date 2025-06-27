const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
app.get('/', (req, res) => {
    res.send("Yay our backend is working! ")
})