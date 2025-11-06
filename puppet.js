import puppeteer from 'puppeteer'
import * as XLSX from "xlsx";
import * as fs from "fs";

XLSX.set_fs(fs);

const browser = await puppeteer.launch({headless:true}) 
const page = await browser.newPage() 

const wb = XLSX.readFile("./dispositivos.xlsx"); // Abre o arquivo Excel
const ws = wb.Sheets[wb.SheetNames[0]]; // Escolhe a primeira planilha
const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Converte a planilha para um array
const ip = data[1][0];  

await page.authenticate({'username':'admin', 'password': 'admin'});

for(let i = 1;i < data.length; i++){
    console.log(`\nSe conectando ao IP ${data[i][0]} ...`)

    try{
        await page.goto(`http://${data[i][0]}`, { timeout: 10000, waitUntil: 'load' })

        // Seleciona elemento de status do dispositivo 
        const iotStatus = await page.waitForSelector('.content_main',{ visible:true, timeout:20000 })   
        await new Promise(r => setTimeout(r, 1000)); // Espera 1 segundo pra garantir que o elemento terminou de renderizar

        // Tira um print e pega informações
        
        // MAC
        await page.waitForSelector('#mac');
        const numSerie = await page.$eval('#mac',el => el.innerText)
        console.log(`Número de série do equipamento: ${numSerie}`)

        // Porta Serial - Recebidos
        await page.waitForSelector("#received_bytes")
        const serialRecebido = await page.$eval('#received_bytes',el => el.innerText)
        console.log(`Número de dado recebidos na porta serial: ${serialRecebido}`)
        
        // MQTT - Enviados
        await page.waitForSelector("[name=RecvBytes]")
        const mqttEnviado = await page.$eval('[name=RecvBytes]',el => el.innerText)
        console.log(`Número de dado enviados pelo MQTT: ${mqttEnviado}`)

        // Tira um print do status
        await iotStatus.screenshot({path:`print-${numSerie}.jpg`})
        
        // Verifica o servidor para se comunicar 
        await page.goto(`http://${ip}/socket.html`)
        await page.waitForSelector('#server', { visible: true, timeout: 10000 }); // Espera o elemento carregar 
        const urlServidor = await page.$eval('#server',el => el.value)
        console.log(`Servidor a se comunicar: ${urlServidor}`)


    }
    catch(err){
        console.error(`${err}`)
        continue
    } 
}

console.log("\n")
await browser.close()