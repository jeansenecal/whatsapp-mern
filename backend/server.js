import express from 'express';
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1108598",
    key: "4911f9d416e4cbfa0ad8",
    secret: "3dcfd0920da71d8f57f9",
    cluster: "us2",
    useTLS: true
  });

const db = mongoose.connection;
db.once('open', () => {
    console.log("DB is connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received : messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher');
        }
    })
});

app.use(express.json());
app.use(cors());

const connection_url = "mongodb+srv://admin:pass@cluster0.g0j9c.mongodb.net/whatsappDb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req,res) => res.status(200).send('hello world'));

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
        
    })
})
app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.listen( port, () => console.log("listening on localhost " + port));