'use strict'

const express = require('express')
const app = express()
const hbs = require('express-handlebars');
const path = require('path')
const User = require('./models/userRegister')
const cookieSession = require('cookie-session')


require('./configurationdb/configdb')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cookieSession({
   secret: 'una_session',
   maxAge: 24 * 60 * 60 *1000 
}))

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
   if(req.session.userId){                    
         const users = await User.find()
      res.render('index', { users })    
   }else{
     res.redirect('/login')
   }

 })

app.get('/register', (req, res)=>{
   res.render('register')
})

app.post('/register', async (req, res)=>{
   const {name, email, password} = req.body
      
      const user = await new User ({name, email, password})
      await user.save()        
      res.status(200).redirect('/login')    
})

app.get('/login', (req, res)=>{   
   res.render('login')
})

app.post('/login', async (req, res, next)=>{
   try{      
      const user = await User.autenticate(req.body.email, req.body.password)
      if(user){
         req.session.userId = user._id                
         return res.redirect('/')
      }else{
        res.render('login')
      }
   }catch(err){
      return next(err)
   }
})

app.get('/logout', (req, res)=>{
   req.session = null
   res.clearCookie('session')
   res.clearCookie('session.sig')
   res.redirect('login')
}) 


app.listen(3000, ()=>console.log("running in port 3000"))

