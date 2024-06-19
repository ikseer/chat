const { app, server } = require('./app');
const  swaggerDocs=require ( './swagger.js')

require('./db');



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


swaggerDocs(app, 3000)

