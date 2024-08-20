const exprees = require("express")
const app = exprees();
const port = 8080;
const path = require("path")
const {v4 : uuidv4} = require("uuid")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(exprees.static(path.join(__dirname,"/public")))
app.use(exprees.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.engine("ejs", ejsMate)


let posts = [
    {
        id : uuidv4(),
        username : "soheb mulani",
        content : "i am software devloper"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content}) 
    res.redirect("/posts")
})


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let singlePost = posts.find((p)=> id === p.id)
    res.render("show.ejs",{singlePost})
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let singlePost = posts.find((p)=> id===p.id)
    res.render("edit.ejs",{singlePost})
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let changeData = req.body.content;
    let singlePost = posts.find((p)=> id === p.id)
    singlePost.content = changeData;
    res.redirect("/posts")
})


app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id)
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log(`server start : ${port}`)
})
