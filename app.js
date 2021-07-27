'use strict'

const express = require('express')
const app = express()
const hbs = require('express-handlebars');
const path = require('path')
const User = require('./models/userRegister')


require('./configurationdb/configdb')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', hbs({
   runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  },   
   layoutsDir:path.join(app.get('views'),'layouts'),
   partialsDir:path.join(app.get('views'),'partials'),
   extname:'.hbs',
   defaultLayout:'main'
}))

app.set('view engine', 'hbs')

app.get('/', async (req, res)=>{
    const users = await User.find()
      res.render('index', { users })
 })

app.get('/register', (req, res)=>{
   res.render('register')

})

app.post('/register', async (req, res)=>{
   const {name, email, password} = req.body
      
      const user = await new User ({name, email, password})
      await user.save()        
      res.status(200).redirect('/')    
})
 


app.listen(3000, ()=>console.log("running in port 3000"))

