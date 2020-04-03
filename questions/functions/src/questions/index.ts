import * as express from "express";
import admin from "../fb"; 
//import Question from "../models/question";
//import Option from "../models/option"; 


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


questionRouter.get('/:collection/:userid', async (req, res) => {
    try {
        
         res.status(200).json("Trying to get " + req.params.userid + "from " + req.params.collection);
     } catch (error) {
         res.status(500).send(error);
     }
 });

questionRouter.post('/addQuestion', async (req, res) => {
    try {
        const question = JSON.parse(req.body);
        const newDoc = await db.collection(questionCollection).add(question);
        res.status(201).send(`Created a new question: ${newDoc.id}`);
     } catch (error) {
        res.status(400).send(error);
     }
 });





