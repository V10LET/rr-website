import 'dotenv/config'
import app from './app'

const port = process.env.PORT || 1337

app.listen(port, () => console.log('Running on port ' + port))

