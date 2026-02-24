import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}) 

const page = await browser.newPage() 

// Select the credentials to be used when accessing the device configuration page
await page.authenticate({'username':'USER', 'password': 'PASSWORD'});

// Access the device configuration page
await page.goto('http://IP-OF-DEVICE')

// Select the element with the device status
const iotStatus = await page.waitForSelector('.content_main')

// System State
console.log(`\nSystem State\n`)

// Select the element with the device status
await page.waitForSelector('#product_name') // Wait for the element to load
const productName = await page.$eval('#product_name', el => el.textContent)
console.log(`Product Name: ${productName}`)

await page.waitForSelector('#dhcp')    
const dhcp = await page.$eval('#dhcp', el => el.textContent)
console.log(`DHCP: ${dhcp}`)

await page.waitForSelector('#mask')    
const mask = await page.$eval('#mask', el => el.textContent)
console.log(`Mask: ${mask}`)

await page.waitForSelector('#dns')     
const dns = await page.$eval('#dns', el => el.textContent)
console.log(`DNS: ${dns}`)

await page.waitForSelector('#system_time') 
const systemTime = await page.$eval('#system_time', el => el.textContent)
console.log(`System Time: ${systemTime}`)

await page.waitForSelector('#ram_remain')   
const ramRemain = await page.$eval('#ram_remain', el => el.textContent)
console.log(`RAM Remain: ${ramRemain}`)

await page.waitForSelector('#config_protected')    
const configProtected = await page.$eval('#config_protected', el => el.textContent)
console.log(`Config Protected: ${configProtected}`)

await page.waitForSelector('#wifi_rssi')    
const wifiRssi = await page.$eval('#wifi_rssi', el => el.textContent)
console.log(`WiFi RSSI: ${wifiRssi}`)

await page.waitForSelector('#mac')    
const mac = await page.$eval('#mac', el => el.textContent)
console.log(`MAC: ${mac}`)

await page.waitForSelector('#ip')    
const ip = await page.$eval('#ip', el => el.textContent)
console.log(`IP: ${ip}`)

await page.waitForSelector('#gateway')     
const gateway = await page.$eval('#gateway', el => el.textContent)
console.log(`Gateway: ${gateway}`)

await page.waitForSelector('#firmware_version')    
const firmwareVersion = await page.$eval('#firmware_version', el => el.textContent)
console.log(`Firmware Version: ${firmwareVersion}`)

await page.waitForSelector('#running_time')    
const runningTime = await page.$eval('#running_time', el => el.textContent)
console.log(`Running Time: ${runningTime}`)

await page.waitForSelector('#max_block_size')    
const maxBlockSize = await page.$eval('#max_block_size', el => el.textContent)
console.log(`Max Block Size: ${maxBlockSize}`)

await page.waitForSelector('#wifi_state')    
const wifiState = await page.$eval('#wifi_state', el => el.textContent)
console.log(`WiFi State: ${wifiState}`)


// Serial Port State
console.log(`\nSerial Port State\n`)

await page.waitForSelector('#received_bytes')       
const receivedBytes = await page.$eval('#received_bytes', el => el.textContent)
console.log(`Received Bytes: ${receivedBytes}`)

await page.waitForSelector('#sent_bytes')     
const sentBytes = await page.$eval('#sent_bytes', el => el.textContent)
console.log(`Sent Bytes: ${sentBytes}`)

await page.waitForSelector('#failed_bytes')     
const failedBytes = await page.$eval('#failed_bytes', el => el.textContent)
console.log(`Failed Bytes: ${failedBytes}`)

await page.waitForSelector('#config')     
const config = await page.$eval('#config', el => el.textContent)
console.log(`Config: ${config}`)

await page.waitForSelector('#received_frames')     
const receivedFrames = await page.$eval('#received_frames', el => el.textContent)
console.log(`Received Frames: ${receivedFrames}`)

await page.waitForSelector('#sent_frames')  
const sentFrames = await page.$eval('#sent_frames', el => el.textContent)
console.log(`Sent Frames: ${sentFrames}`)

await page.waitForSelector('#failed_frames')    
const failedFrames = await page.$eval('#failed_frames', el => el.textContent)
console.log(`Failed Frames: ${failedFrames}`)


// Communication State - 'MQTT'
console.log(`\nCommunication State - 'MQTT'\n`)

await page.waitForSelector('[name="RecvBytes"]')
const recvBytesMQTT = await page.$eval('[name="RecvBytes"]', el => el.textContent)
console.log(`Recv Bytes: ${recvBytesMQTT}`)

await page.waitForSelector('[name="SendBytes"]')
const sentBytesMQTT = await page.$eval('[name="SendBytes"]', el => el.textContent)
console.log(`Sent Bytes: ${sentBytesMQTT}`)

await page.waitForSelector('[name="FailedBytes"]')     
const failedBytesComm = await page.$eval('[name="FailedBytes"]', el => el.textContent)
console.log(`Failed Bytes: ${failedBytesComm}`)

await page.waitForSelector('[name="Protocol"]')       
const protocol = await page.$eval('[name="Protocol"]', el => el.textContent)
console.log(`Protocol: ${protocol}`)

await page.waitForSelector('[name="ClientIP"]')       
const clientIP = await page.$eval('[name="ClientIP"]', el => el.textContent)
console.log(`Client IP: ${clientIP}`)

await page.waitForSelector('[name="RecvFrames"]')       
const recvFrames = await page.$eval('[name="RecvFrames"]', el => el.textContent)
console.log(`Recv Frames: ${recvFrames}`)

await page.waitForSelector('[name="SentFrames"]')       
const sentFramesComm = await page.$eval('[name="SentFrames"]', el => el.textContent)
console.log(`Sent Frames: ${sentFramesComm}`)

await page.waitForSelector('[name="FailedFrames"]')    
const failedFramesComm = await page.$eval('[name="FailedFrames"]', el => el.textContent)
console.log(`Failed Frames: ${failedFramesComm}`)

await page.waitForSelector('[name="State"]')    
const state = await page.$eval('[name="State"]', el => el.textContent)
console.log(`State: ${state}`)


// Print element status page
await iotStatus.screenshot({path: 'screenshot-1.jpg'})

await browser.close()