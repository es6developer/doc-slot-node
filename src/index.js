import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
var app = express();
const port = process.env.PORT || 3000


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/doc-pat", { useNewUrlParser: true });
app.use(cors());

// routes
import slotRoute from './routes/slots';
app.use('/slots', slotRoute);
import appointmentRoute from './routes/appointment';
app.use('/appointment', appointmentRoute);

app.get('/', function(req, res) {
    res.send('API running')
});
app.listen(port, () => {
    console.log(`Doc-api app listening at http://localhost:${port}`)
})

module.export = app;