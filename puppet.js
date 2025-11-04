import puppeteer from 'puppeteer'

const browser = await puppeteer.launch() 

const page = await browser.newPage() 

// Seleciona as credenciais a serem usadas ao acessar a página de configuração do dispositivo
await page.authenticate({'username':'USUARIO', 'password': 'SENHA'});

// Acessa a página de configuraçã 
await page.goto('http://IP-DO-DISPOSITIVO')

// Seleciona elemento da página com status do dispositivo
const iotStatus = await page.waitForSelector('.content_main')

// Tira um print do element com status do dispsitivo
await iotStatus.screenshot({path: 'screenshot-1.jpg'})

await browser.close()