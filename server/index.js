const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true
}

// MiddleWares
app.use(express.json())
app.use(cors(corsOptions))


/* Database Starts Here */

const uri = `mongodb+srv://${process.env.VOLORA_USER}:${process.env.VOLORA_PASS}@cluster0.u5bo5wl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        /* DB collection Starts */
        const volunteerCollection = client.db('volora').collection('volunteers')
        const requestCollection = client.db('volora').collection('applicant-request');
        /* DB collection End */


        // Get All Volunteers in collection..
        app.get('/volunteers', async (req, res) => {
            const { searchField } = req.query;
            console.log(searchField)
            let query = {}
            if (searchField) {
                query = {
                    $or: [
                        { postTitle: { $regex: searchField, $options: "i" } },
                        { category: { $regex: searchField, $options: "i" } },
                    ]
                }
            }
            const result = await volunteerCollection.find(query).toArray()
            res.send(result)
        })

        // Post/Include a new volunteer post
        app.post('/add-volunteer', async (req, res) => {
            const volunteerData = req.body;
            console.log(volunteerData)
            try {
                const result = await volunteerCollection.insertOne(volunteerData);
                res.send(result);
            }
            catch (err) {
                res.status(500).send({ message: "Failed to add new User now!" })
            }
        })


        // Volunteer need post detail / update a specific job, get a specif volunteer data
        app.get('/volunteer/:id', async (req, res) => {
            const { id } = req.params;
            const result = await volunteerCollection.findOne({ _id: new ObjectId(id) });
            res.send(result)
        })


        // Retrieve my volunteer need post & my volunteer request post
        app.get('/my-post', async (req, res) => {
            const { email } = req.query;
            const query = { "organizer.email": email }
            const result = await volunteerCollection.find(query).toArray();
            res.send(result)
        })



        // Update a volunteer post
        app.put('/volunteer/:id', async (req, res) => {
            const updatedVolunteerData = req.body;
            const query = { _id: new ObjectId(req.params.id) };
            const updateData = {
                $set: updatedVolunteerData
            }
            const result = await volunteerCollection.updateOne(query, updateData);
            res.send(result);
        })



        // Delete a volunteer post
        app.delete('/volunteer/:id', async (req, res) => {
            res.send(await volunteerCollection.deleteOne({ _id: new ObjectId(req.params.id) }))
        })



        /* {
          thumbnail: 'https://i.ibb.co/Hgt3t5X/Young-children-attending-a-workshop-in-an-art-gall.jpg',
          postTitle: "Children's Art Workshop",
          location: 'City Art Center, 456 Elm St, Artsville, USA',     
          deadline: '2025-12-05T13:09:02.000Z',
          category: 'Education',
          organizer: {
            name: 'Pranta Deb Nath',
            email: 'prantadeb@gmail.com',
            photo: 'https://i.ibb.co/rk7V7X0/1655721926569-3.jpg'      
          },
          suggestion: 'adsda',
          volunteerId: '6896eed51bac51b4c94246ec',
          volunteerDetails: {
            name: 'Hridoy khan',
            email: 'hridoykhan148385@gmail.com',
            photo: 'https://lh3.googleusercontent.com/a/ACg8ocKyl10F6nY22XSEeVV221cHtKjsA6FjKq1Gx1I7Rd_A5AOCmqd-zg=s96-c'
          }
        } */

        /* Request Collection Starts */


        // Post request

        app.post('/volunteer-request/:email', async (req, res) => {
            try {

                const { email } = req.params;
                const { volunteerId, ...request } = req.body;
                const isRequestExist = await requestCollection.findOne({ "volunteerDetails.email": email, volunteerId });
                // Checking whether already exists or not
                if (isRequestExist) {
                    return res.status(409).send({ message: "Already applied for this Post" });
                }
                const query = { _id: new ObjectId(volunteerId) }
                const volunteer = await volunteerCollection.findOne(query);

                if (!volunteer) {
                    return res.status(404).send({ message: 'Volunteer not found' });
                }
                if (volunteer.volunteersNeeded < 1) {
                    return res.send({ message: 'No volunteer needed' });
                }
                // Reducing volunteer needed Count
                const updateVolunteerNeedCount = await volunteerCollection.updateOne(query, { $inc: { volunteersNeeded: -1 } })

                const result = await requestCollection.insertOne({ volunteerId, ...request });

                res.send(result)
            }
            catch (err) {
                res.status(500).send({ message: "Server Error" })
            }
        })

        // Retrieve my requests
        app.get('/my-requests/:email', async (req, res) => {
            const { email } = req.params;
            console.log(email)
            const query = { "volunteerDetails.email": email }
            const result = await requestCollection.find(query).toArray();
            res.send(result)
        })

        // Delete My request
        app.delete('/volunteer-request/:id', async (req, res) => {
            res.send(await requestCollection.deleteOne({ _id: new ObjectId(req.params.id) }))
        })



        /* Request Collection Ends */





        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {



    }
}
run().catch(console.dir);



/* Database Ends Here */










app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})