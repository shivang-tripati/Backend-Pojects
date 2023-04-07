const express = require('express');
const app = express();
const tasks = require('./routes/task')
const bodyParser = require('body-parser')

require('dotenv').config()
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')






// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

// middleware
app.use(express.static('./public'))
app.use(express.json())


// routes
app.use('/api/v1/tasks', tasks)


app.use(notFound)
app.use(errorHandlerMiddleware)




      
const port = process.env.PORT || 3000
// // When you finally deploy applications in any service, We might have to mess around the port
//  where the application is set to run. So if you hard-code it in your code, you have to go back and change it in your code every time
//  you make any change in your deployment configuration. So instead, you use process. env.


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)

    }
} 
start()

