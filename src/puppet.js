import 'dotenv/config'
import puppeteer from 'puppeteer'
import { resetEW11 } from './controllers/reset.js'

const browser = await puppeteer.launch({
  headless: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}) 

const page = await browser.newPage()

const USER = process.env.DEVICE_USER || 'admin'; 
const PASS = process.env.DEVICE_PASS || 'admin';

// Select the credentials to be used when accessing the device configuration page
await page.authenticate({
  username: USER, 
  password: PASS
});

const IP_ELFIN = process.env.DEVICE_IP || '10.10.100.254'
console.log(`acessing IP: ${IP_ELFIN}`)

// Access the device configuration page
await page.goto(`http://${IP_ELFIN}`, { waitUntil: 'networkidle2' })

// System State
console.log(`\nSystem State\n`)

// Select the element with the device status
const productName = await page.$eval('#product_name', el => el.textContent)
console.log(`Product Name: ${productName}`)

const dhcp = await page.$eval('#dhcp', el => el.textContent)
console.log(`DHCP: ${dhcp}`)

const mask = await page.$eval('#mask', el => el.textContent)
console.log(`Mask: ${mask}`)

const dns = await page.$eval('#dns', el => el.textContent)
console.log(`DNS: ${dns}`)

const systemTime = await page.$eval('#system_time', el => el.textContent)
console.log(`System Time: ${systemTime}`)

const ramRemain = await page.$eval('#ram_remain', el => el.textContent)
console.log(`RAM Remain: ${ramRemain}`)

const configProtected = await page.$eval('#config_protected', el => el.textContent)
console.log(`Config Protected: ${configProtected}`)

const wifiRssi = await page.$eval('#wifi_rssi', el => el.textContent)
console.log(`WiFi RSSI: ${wifiRssi}`)

const mac = await page.$eval('#mac', el => el.textContent)
console.log(`MAC: ${mac}`)

const ip = await page.$eval('#ip', el => el.textContent)
console.log(`IP: ${ip}`)

const gateway = await page.$eval('#gateway', el => el.textContent)
console.log(`Gateway: ${gateway}`)

const firmwareVersion = await page.$eval('#firmware_version', el => el.textContent)
console.log(`Firmware Version: ${firmwareVersion}`)

const runningTime = await page.$eval('#running_time', el => el.textContent)
console.log(`Running Time: ${runningTime}`)

const maxBlockSize = await page.$eval('#max_block_size', el => el.textContent)
console.log(`Max Block Size: ${maxBlockSize}`)

const wifiState = await page.$eval('#wifi_state', el => el.textContent)
console.log(`WiFi State: ${wifiState}`)


// Serial Port State
console.log(`\nSerial Port State\n`)

const receivedBytes = await page.$eval('#received_bytes', el => el.textContent)
console.log(`Received Bytes: ${receivedBytes}`)

const sentBytes = await page.$eval('#sent_bytes', el => el.textContent)
console.log(`Sent Bytes: ${sentBytes}`)

const failedBytes = await page.$eval('#failed_bytes', el => el.textContent)
console.log(`Failed Bytes: ${failedBytes}`)

const config = await page.$eval('#config', el => el.textContent)
console.log(`Config: ${config}`)

const receivedFrames = await page.$eval('#received_frames', el => el.textContent)
console.log(`Received Frames: ${receivedFrames}`)

const sentFrames = await page.$eval('#sent_frames', el => el.textContent)
console.log(`Sent Frames: ${sentFrames}`)

const failedFrames = await page.$eval('#failed_frames', el => el.textContent)
console.log(`Failed Frames: ${failedFrames}`)


// Communication State - 'MQTT'
console.log(`\nCommunication State - 'MQTT'\n`)

const recvBytesMQTT = await page.$eval('[name="RecvBytes"]', el => el.textContent)
console.log(`Recv Bytes: ${recvBytesMQTT}`)

const sentBytesMQTT = await page.$eval('[name="SendBytes"]', el => el.textContent)
console.log(`Sent Bytes: ${sentBytesMQTT}`)

const failedBytesComm = await page.$eval('[name="FailedBytes"]', el => el.textContent)
console.log(`Failed Bytes: ${failedBytesComm}`)

const protocol = await page.$eval('[name="Protocol"]', el => el.textContent)
console.log(`Protocol: ${protocol}`)

const clientIP = await page.$eval('[name="ClientIP"]', el => el.textContent)
console.log(`Client IP: ${clientIP}`)

const recvFrames = await page.$eval('[name="RecvFrames"]', el => el.textContent)
console.log(`Recv Frames: ${recvFrames}`)

const sentFramesComm = await page.$eval('[name="SentFrames"]', el => el.textContent)
console.log(`Sent Frames: ${sentFramesComm}`)

const failedFramesComm = await page.$eval('[name="FailedFrames"]', el => el.textContent)
console.log(`Failed Frames: ${failedFramesComm}`)

const state = await page.$eval('[name="State"]', el => el.textContent)
console.log(`State: ${state}`)

// Print element status page
const iotStatus = await page.waitForSelector('.content_main')
await iotStatus.screenshot({path: 'screenshot-status.jpg'})

// Reset EW11
//await resetEW11(page)

await browser.close()