const express = require('express')
const app = express()

const { exec } = require('child_process')

const cors = require('cors')
app.use(cors())

const domain = '.zs1mm.local'

app.get('/shutdown/:computerName', (req, res) => {
    const computerName = req.params.computerName + domain
    const cmd = `C:\Program Files\Veyon\veyon-cli.exe feature start ${computerName} PowerDownNow`

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return res.status(500).send(`Error: ${error.message}`)
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return res.status(500).send(`stderr: ${stderr}`)
        }

        console.log(`stdout: ${stdout}`)
        res.send(`Komputer ${computerName} został wyłączony`)
    })
})

app.get('/lock/:computerName', (req, res) => {
    const computerName = req.params.computerName + domain
    const cmd = `C:\Program Files\Veyon\veyon-cli.exe feature start ${computerName} ScreenLock`

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return res.status(500).send(`Error: ${error.message}`)
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return res.status(500).send(`stderr: ${stderr}`)
        }

        console.log(`stdout: ${stdout}`)
        res.send(`Zablokowano komputer ${computerName}`)
    })
})

app.get('/unlock/:computerName', (req, res) => {
    const computerName = req.params.computerName + domain
    const cmd = `C:\Program Files\Veyon\veyon-cli.exe feature stop ${computerName} ScreenLock`

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return res.status(500).send(`Error: ${error.message}`)
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return res.status(500).send(`stderr: ${stderr}`)
        }

        console.log(`stdout: ${stdout}`)
        res.send(`Odblokowano komputer ${computerName}`)
    })
})

app.listen(3000, () => {
    console.log('OK')
})