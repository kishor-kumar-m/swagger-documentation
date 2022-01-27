import express from 'express'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'


const swaggerJsDocs =YAML.load('src/api.yaml')

const app = express()
app.use(morgan('dev'));
app.use(express.json())
app.use(fileUpload())

app.use("/",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs))

let users =[{id: 1 ,name : "kishor"},{id :2 , name : "kumar"}]
app.get("/string",(req,res) => res.status(200).json({
    value :"This is a string"
    })
);

app.get("/user",(req,res) => {
const obj ={id : 1,name :"kishor"}
res.status(200).json(obj)
}
);

app.get("/users",(req,res) => {
    res.status(200).json(users);
})

app.get("/users/:id",(req,res) => {
    const obj = users.find((x) => x.id === parseInt(req.params.id));
    res.status(200).json({
        obj: obj})
})


app.post("/create",(req,res) => {
    users = [req.body,...users];    
    res.status(200).json({
        user : users
    })
})

app.get("/usersQuery",(req,res) => {
    const obj = users.find((x) => x.id === parseInt(req.query.id));
    res.status(200).json({
        obj: obj})
})
app.post("/upload",(req,res) => {
    const file = req.files.file
    let path = __dirname+"/upload/"+"file"+Date.now()+".jpg"
    file.mv(path,(err)=>{
        res.send("uploaded")
    })
})









const port = process.env.PORT || 3000;









app.listen(port, () =>{
    console.log(`Server running on ${port}`)
})