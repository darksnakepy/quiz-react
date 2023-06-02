const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const app = express()

app.use(cors())
app.use(express.static(__dirname + "/build"))

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, "/data/questions.json")))

app.listen(3000, () =>{})

console.log(questions)

app.get("/api/questions", (req, res) =>{
    res.send(questions)               
})

app.get("/api/whichCharacter", (req, res)=>{
    let jsonquery = JSON.parse(req.query.answers)
    let score = 0

    jsonquery.forEach(id => {
        const scoreCalc = questions.find((about) => {
            if (about.for === id.for) {
                about.answer.find((answer) => {
                    if (answer.answer === id.answer) {
                        score += answer.score
                        console.log(score)
                    }
                })
            }
        })
    })

    if (score >= 6) {
        character = "Michael Myers";
    } else if (score >= 4) {
        character = "Freddy Krueger";
    } else if (score >= 2) {
        character = "Jason Voorhees";
    } else {
        character = "Ghostface";
    }
    
    res.send({whichcharacter: "You are: " +character, score: score})
})
