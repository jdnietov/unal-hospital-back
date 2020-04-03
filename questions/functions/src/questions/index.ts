import * as express from "express";
import admin from "../fb";
import * as core from "../core/functions";


//firebase 
const db = admin.firestore();
const questionCollection = 'Questions';

// router
export let questionRouter = express.Router();

questionRouter.get('/test',function(req,res,next) {
    res.send('home  questions or root functionality');
});

// Get all questiones 

questionRouter.get('/', async (req, res) => {
   try {
        const questionQuerySnapshot = await db.collection(questionCollection).get();
        const questions: any[] = [];
        questionQuerySnapshot.forEach(
            (doc)=>{
                questions.push({
                    id: doc.id,
                    title: doc.data()["title"],
                    label: doc.data()["label"],
                    options: doc.data()["options"],
                    type: doc.data()["type"],
                    weight: doc.data()["weight"]
            });
            }
        );
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});


questionRouter.post('/addQuestion', async (req, res) => {
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


