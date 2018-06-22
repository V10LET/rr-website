import 'dotenv/config'
import app from './app'

app.listen(process.env.PORT, () => console.log('Running on localhost:' + process.env.PORT))

