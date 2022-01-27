import tl = require('azure-pipelines-task-lib/task');
import https = require('https')

const data = JSON.stringify({
    routing_key: tl.getInput('routingkey', true),
    payload: {
        summary: tl.getInput('summary', true),
        source: tl.getInput('source', false),
        custom_details: {
            build_state: tl.getInput('buildstate', false),
            build_number: tl.getInput('buildnumber', false),
        }
    },
    links: [{
        href: tl.getInput('linkshref', true),
        text: tl.getInput('linkstext', false)
    }]
})

const options = {
    hostname: 'events.pagerduty.com',
    port: '443',
    path: '/v2/change/enqueue',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()
