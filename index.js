const express = require("express")
const {NlpManager, Language} = require("node-nlp")
const manager = new NlpManager({ languages: ['en'] });
let app = express()
PORT = 7000

app.use(express.json())

// Add Document
manager.addDocument ('en', "hello", "greeting" )
manager.addDocument ('en', "hii", "greeting" )
manager.addDocument ('en', "hey you", "greeting" )
manager.addDocument ('en', "yo", "greeting" )
manager.addDocument ('en', "good  morning", "greeting" )
manager.addDocument ('en', "good afternoon", "greeting" )

// // Add Answers 
manager.addAnswer ('en', "greeting" , "hey!" )
manager.addAnswer ('en', "greeting" , "hey buddy!" )
manager.addAnswer ('en', "greeting" , "hey whatsapp!" )
manager.addAnswer ('en', "greeting" , "hey there !" )
manager.addAnswer ('en', "greeting" , "very good afternoon!" )
manager.addAnswer ('en', "greeting" , "very good morning!" )
manager.addAnswer ('en', "greeting" , "hey how are you!" )


// train model 
manager.train().then(()=>{
    manager.save()
    app.get("/bot", async (req,res)=>{
        let response = await manager.process("en", req.query.message)
        res.send(response.answer)
    })

    app.post("/getbot", async (req,res)=>{
        let response = await manager.process("en", req.body.message)
        res.send(response.answer)
    })
})





app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})