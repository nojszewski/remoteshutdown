const express = require('express')
const app = express()
const { exec } = require('child_process')
const cors = require('cors')
const fs = require('fs')

app.use(cors())

try {
    // zobacz config.json
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
    if (Array.isArray(config.computers)) {
        computers = config.computers
    } else {
        console.error('Invalid config file: "computers" should be an array.')
    }
} catch (error) {
    console.error('Error reading or parsing config.json:', error.message)
}

// endpoint do wyłączania kompów
app.get('/shutdown/:computerName', (req, res) => {
    if (req.params.computerName === 'all') {
        let completed = 0
        
        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computer} PowerDownNow`
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`Błąd przy ${computer}: ${error ? error.message : stderr}`)
                    if (!res.headersSent) {
                        res.send('failed')
                    }
                    return
                }
                completed++
                if (completed === computers.length) {
                    res.send('success')
                }
            })
        })
    } else {
        const computerName = req.params.computerName
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} PowerDownNow`
        exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(`Błąd przy ${computerName}: ${error ? error.message : stderr}`)
                return res.send('failed')
            }
            res.send('success')
        })
    }
})

// endpoint do blokowania kompów
app.get('/lock/:computerName', (req, res) => {
    if (req.params.computerName === 'all') {
        let completed = 0
        
        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computer} ScreenLock`
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`Błąd przy ${computer}: ${error ? error.message : stderr}`)
                    if (!res.headersSent) {
                        res.send('failed')
                    }
                    return
                }
                completed++
                if (completed === computers.length) {
                    res.send('success')
                }
            })
        })
    } else {
        const computerName = req.params.computerName
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} ScreenLock`
        exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(`Błąd przy ${computerName}: ${error ? error.message : stderr}`)
                return res.send('failed')
            }
            res.send('success')
        })
    }
})

// endpoint do odblokowywania kompów
app.get('/unlock/:computerName', (req, res) => {
    if (req.params.computerName === 'all') {
        let completed = 0
        
        computers.forEach(computer => {
            const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature stop ${computer} ScreenLock`
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`Błąd przy ${computer}: ${error ? error.message : stderr}`)
                    if (!res.headersSent) {
                        res.send('failed')
                    }
                    return
                }
                completed++
                if (completed === computers.length) {
                    res.send('success')
                }
            })
        })
    } else {
        const computerName = req.params.computerName
        const cmd = `"C:\\Program Files\\Veyon\\veyon-cli.exe" feature start ${computerName} ScreenLock`
        exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(`Błąd przy ${computerName}: ${error ? error.message : stderr}`)
                return res.send('failed')
            }
            res.send('success')
        })
    }
})

app.listen(3000, () => {
    console.log('OK, działa na porcie 3000')
})
