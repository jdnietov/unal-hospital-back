import * as express from "express";
//import admin from "../fb";
import * as core from "../core/functions";


//firebase
//const db = admin.firestore();
const questionCollection = 'Answers';

// router
export let questionRouter = express.Router();

questionRouter.get('/test',function(req,res,next) {
    res.send('home  answers or root functionality');
});

questionRouter.post('/addAnswer', async (req, res) => {
    // @ts-ignore
    let response = await core.fireBaseAddDocument({
        collectionName: questionCollection,
        jsonDocument: req.body
    });
    const statusCode = response[0];
    const statusDesc = response[1];

    if (typeof statusCode === "number") {
        res.status(statusCode).send(statusDesc);
    }
 });
