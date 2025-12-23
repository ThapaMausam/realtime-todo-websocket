import app from './src/app.ts'
import { envConfig } from './src/config/config.ts'
import connectToDb from './src/config/dbConfig.ts'

function startServer() {
    connectToDb()
    const port = envConfig.port || 4000
    app.listen(port, () => {
        console.log(`Server has started on port ${port}`)
    })
}

startServer()