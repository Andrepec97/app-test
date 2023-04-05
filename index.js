const express = require('express')
const app = express()

app.use(express.static('templates'))
app.use(express.json())
const users = []
// Login
app.get('/', (req, res) => {
    res.sendFile('login.html', {root: __dirname + "/templates"})
})

app.post('/', (req, res) => {
    const user = req.body;
    if (!user.email || !user.password) return res.status(400).json({
        success: false,
        message: 'Email and password required'
    })

    const userExist = users.find((utente) => utente.email === user.email)
    if (!userExist) return res.status(400).json({
        success: false,
        message: 'User does not exist, please verify credentials or sign up'
    })

    if (userExist.password !== user.password) return res.status(400).json({
        success: false,
        message: 'Email or password wrong'
    })

    console.log(users)
    res.status(200).json({success: true, message: 'Logged in'})
})

app.get('/sign-up', (req, res) => {
    res.sendFile('signup.html', {root: __dirname + "/templates"})
})

app.get('/signed-up', (req, res) => {
    res.sendFile('signedup.html', {root: __dirname + "/templates"})
})

app.post('/sign-up', (req, res) => {
    const user = req.body;
    if (!user.email || !user.password) return res.status(400).json({
        success: false,
        message: 'Email and password required'
    })

    const isUserAlreadySigned = users.find((utente) => utente.email === user.email)
    if (!!isUserAlreadySigned) return res.status(400).json({
        success: false,
        message: 'Email found - User already signed up'
    })

    users.push(user)
    console.log(users)
    res.status(201).json({success: true, message: 'Signed Up'})
})

app.get('/first-page', (req, res) => {
    res.sendFile('firstPage.html', {root: __dirname + "/templates"})
})

app.get('/second-page', (req, res) => {
    res.sendFile('secondPage.html', {root: __dirname + "/templates"})
})

app.get('/logout', (req, res) => {
    res.sendFile('logout.html', {root: __dirname + "/templates"})
})

app.all('*', (req, res) => {
    res.sendFile('not-found.html', {root: __dirname + "/templates"})
})

app.listen(3000)