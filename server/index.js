const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
const corsOptions = {
    origin: ["http://localhost:5173", "https://volora-92f4d.web.app"],
    credentials: true
}

// MiddleWares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// Custom Domain
const verifyToken = (req, res, next) => {
    const token = req.cookies?.jwtToken
    if (!token) {
        return res.status(401).send({ message: "Unauthorized Access" })
    }

    jwt.verify(token, process.env.VOLORA_JWT_TOKEN, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized Access" })
        req.user = decoded;
        next()
    })
}


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
        const userCollection = client.db('volora').collection('user-info')
        const reviewCollection = client.db('volora').collection('reviews')
        /* DB collection End */


        /* JWT related APIs start */
        app.post('/jwt', (req, res) => {
            const user = req.body;

            const token = jwt.sign(user, process.env.VOLORA_JWT_TOKEN, { expiresIn: '365d' });
            res.cookie('jwtToken', token, cookieOptions).send({ message: 'Login Success' });
        })

        app.get('/logout', (req, res) => {
            res.clearCookie('jwtToken', process.env.VOLORA_JWT_TOKEN, { ...cookieOptions, maxAge: 0 }).send({ message: 'Success: Sign Out' })
        })



        /* ****************** JWT related APIs end ************* */



        /* ######### Pagination APIs Start ##############  */
        app.get('/totalVolunteersPostCount', async (req, res) => {
            const { searchField } = req.query;
            let query = {}
            if (searchField) {
                query = {
                    $or: [
                        { postTitle: { $regex: searchField, $options: "i" } },
                        { category: { $regex: searchField, $options: "i" } },
                    ]
                }
            }
            const count = await volunteerCollection.countDocuments(query);
            res.send({ count });
        })
        /* ######### Pagination APIs End ##############  */





        // Get All Volunteers in collection..
        app.get('/volunteers', async (req, res) => {
            const { searchField, size, page } = req.query;

            const currentPage = parseInt(page - 1);
            const currentSize = parseInt(size);

            let query = {}
            if (searchField) {
                query = {
                    $or: [
                        { postTitle: { $regex: searchField, $options: "i" } },
                        { category: { $regex: searchField, $options: "i" } },
                    ]
                }
            }
            const result = await volunteerCollection.find(query).skip(currentPage * currentSize).limit(currentSize).toArray()
            res.send(result)
        })

        // Post/Include a new volunteer post
        app.post('/add-volunteer', async (req, res) => {
            const volunteerData = req.body;
            try {
                const result = await volunteerCollection.insertOne(volunteerData);
                res.send(result);
            }
            catch (err) {
                res.status(500).send({ message: "Failed to add new User now!" })
            }
        })


        // Volunteer need post detail / update a specific job, get a specif volunteer data
        app.get('/volunteer/:id', verifyToken, async (req, res) => {

            const { id } = req.params;
            const result = await volunteerCollection.findOne({ _id: new ObjectId(id) });
            res.send(result)
        })


        // Retrieve my volunteer need post & my volunteer request post
        app.get('/my-post', verifyToken, async (req, res) => {
            const { email } = req.query;
            if (req.user?.email !== email) return res.status(403).send({ message: "Forbidden Access" })

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


        /* ****************** Request Collection Starts ************* */
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
                await volunteerCollection.updateOne(query, { $inc: { volunteersNeeded: -1 } })

                const result = await requestCollection.insertOne({ volunteerId, ...request });

                res.send(result)
            }
            catch (err) {
                res.status(500).send({ message: "Server Error" })
            }
        })

        // Retrieve my requests
        app.get('/my-requests/:email', verifyToken, async (req, res) => {
            const { email } = req.params;
            if (req.user?.email !== email) return res.status(403).send({ message: "Forbidden Access" })
            const query = { "volunteerDetails.email": email }
            const result = await requestCollection.find(query).toArray();
            res.send(result)
        })

        // Delete My request
        app.delete('/volunteer-request/:id', async (req, res) => {
            try {
                const { volunteerId } = req.body;

                if (!volunteerId) {
                    return res.status(400).send({ message: "volunteerId is required" });
                }

                const matchedVolunteer = await volunteerCollection.findOne({ _id: new ObjectId(volunteerId) });
                if (matchedVolunteer) {
                    await volunteerCollection.updateOne(
                        { _id: new ObjectId(volunteerId) },
                        { $inc: { volunteersNeeded: 1 } }
                    );
                }

                await requestCollection.deleteOne({ _id: new ObjectId(req.params.id) });

                res.send({ message: "Request deleted successfully!" });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Error deleting request" });
            }
        });

        // Update volunteer status
        app.patch('/volunteer-requests/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const { status } = req.body;
            const updateStatus = {
                $set: { status: status }
            }
            const post = await requestCollection.findOne({ _id: new ObjectId(id) });
            const result = await requestCollection.updateOne(query, updateStatus);
            res.send({ result, post })
        })

        // Get all volunteer requests
        app.get('/volunteer-requests/:email', verifyToken, async (req, res) => {
            const { email } = req.params;
            if (req.user?.email !== email) return res.status(403).send({ message: "Forbidden Access" })

            res.send(await requestCollection.find({ 'organizer.email': email }).toArray());
        })

        /* ***************** Request Collection Ends ******************* */





        /*   *************   User Collection start ********************************** */

        app.put('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user?.email }
            const findUser = await userCollection.findOne(query);
            if (!findUser) {
                const result = await userCollection.insertOne(user)
                return res.send(result);
            }
            const result = await userCollection.updateOne(
                query,
                { $set: user }
            )
            res.send(result);
        })


        /* Get the Users */
        app.get('/users/:email', verifyToken, async (req, res) => {
            const { email } = req.params;
            if (req.user?.email !== email) return res.status(403).send({ message: "Forbidden Access" })
            const result = await userCollection.findOne({ email: email });
            if (!result) {
                return res.send({})
            }
            res.send(result)
        })

        /*   *************   User Collection End ********************************** */



        /* ******************* Review Start ***************** */

        app.post('/review', async (req, res) => {
            const review = req.body;
            res.send(await reviewCollection.insertOne(review));
        })

        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result)
        })

        /* ******************* Review End ***************** */






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