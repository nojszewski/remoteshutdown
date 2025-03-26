const express = require('express')
const app = express()
const { exec } = require('child_process')
const cors = require('cors')

app.use(cors())
const domain = '.zs1mm.local'

const computers = [];
for (let i = 1; i <= 14; i++) {
    computers.push(`K-212-${String(i).padStart(2, '0')}`)
}

app.get('/shutdown/:computerName', (req, res) => {
    if (req.params.computerName === 'all') {
        let completed = 0
        
        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computer + domain} PowerDownNow`
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`Błąd przy ${computer}: ${error ? error.message : stderr}`)
                }
                completed++
                if (completed === computers.length) {
                    res.send('Wszystkie komputery zostały wyłączone')
                }
            })
        })
    } else {
        const computerName = req.params.computerName + domain
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} ScreenLock`
        exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(`Błąd przy ${computerName}: ${error ? error.message : stderr}`)
                return res.send('failed')
            }
            res.send(`Zablokowano komputer ${computerName}`)
        })
    }
})

app.get('/lock/:computerName', (req, res) => {
    if (req.params.computerName === 'all') {
        let completed = 0
        
        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computer + domain} ScreenLock`
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`Błąd przy ${computer}: ${error ? error.message : stderr}`)
                }
                completed++
                if (completed === computers.length) {
                    res.send('Wszystkie komputery zostały zablokowane')
                }
            })
        })
    } else {
        const computerName = req.params.computerName + domain
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} ScreenLock`
        exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(`Błąd przy ${computerName}: ${error ? error.message : stderr}`)
                return res.send('failed')
            }
            res.send(`Zablokowano komputer ${computerName}`)
        })
    }
})

app.get('/unlock/:computerName', (req, res) => {
    if (req.params.computerName === 'all') {
        let completed = 0
        
        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature stop ${computer + domain} ScreenLock`
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`Błąd przy ${computer}: ${error ? error.message : stderr}`)
                }
                completed++
                if (completed === computers.length) {
                    res.send('Wszystkie komputery zostały odblokowane')
                }
            })
        })
    } else {
        const computerName = req.params.computerName + domain
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature stop ${computerName} ScreenLock`
        exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(`Błąd przy ${computerName}: ${error ? error.message : stderr}`)
                return res.send('failed')
            }
            res.send(`Odblokowano komputer ${computerName}`)
        })
    }
})

app.listen(3000, () => {
    console.log('OK')
})
