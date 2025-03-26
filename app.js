const express = require('express')
const app = express()

const { exec } = require('child_process')

const cors = require('cors')
app.use(cors())

const domain = '.zs1mm.local'

app.get('/shutdown/:computerName', (req, res) => {
    const computerName = req.params.computerName + domain
    const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} PowerDownNow`

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
    if (req.params.computerName === '212') {
        const computers = [
            'K-212-01',
            'K-212-02',
            'K-212-03',
            'K-212-04',
            'K-212-05',
            'K-212-06',
            'K-212-07',
            'K-212-08',
            'K-212-09',
            'K-212-10',
            'K-212-11',
            'K-212-12',
            'K-212-13',
            'K-212-14'
        ]

        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computer + domain} ScreenLock`
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
                res.send(`Komputer ${computer} został zablokowany`)
            })
        })

    } else {
        computerName = req.params.computerName + domain
        const computerName = req.params.computerName + domain
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} ScreenLock`
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
    }
})

app.get('/unlock/:computerName', (req, res) => {
    const computerName = req.params.computerName + domain
    const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature stop ${computerName} ScreenLock`

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