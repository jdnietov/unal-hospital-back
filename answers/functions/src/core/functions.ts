import admin from "../fb";

const db = admin.firestore();

/*
 * Initial prototype to store information in Firebase
* */
export async function fireBaseAddDocument({collectionName, jsonDocument}: { collectionName: any, jsonDocument: any }) {
    try {
        const document = JSON.parse(jsonDocument);
        const newDoc = await db.collection(collectionName).add(document);
        // @ts-ignore
        return [200, `Document created successfully: ${newDoc.id}`];

    } catch (error) {
        // @ts-ignore
        return [500, `Error creating new document:${error}`];
    }
}