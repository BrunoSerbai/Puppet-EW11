import puppeteer from 'puppeteer'
import * as XLSX from "xlsx";
import * as fs from "fs";

XLSX.set_fs(fs);

const browser = await puppeteer.launch({headless:true}) 
const page = await browser.newPage() 

// Abre o arquivo Excel
const wb = XLSX.readFile("./dispositivos.xlsx");

// Escolhe a primeira planilha
const ws = wb.Sheets[wb.SheetNames[0]];

// Converte a planilha para um array
const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

// Print no console a segunda linha da primeira coluna (Linhas e colunas começam com 0)
const ip = data[1][0]; 

// Seleciona as credenciais a serem usadas ao acessar a página de configuração do dispositivo
await page.authenticate({'username':'USUARIO', 'password': 'SENHA'});

for(let i = 1;i < data.length; i++){
    console.log(`Se conectando ao IP  ${data[i][0]}`)
    try{
        await page.goto(`http://${data[i][0]}`, { timeout: 10000, waitUntil: 'load' })
    }
    catch(err){
        console.error(`ERRO: Não foi possivel acessar: ${data[i][0]}`);
        continue
    }
        // Seleciona elemento da página com status do dispositivo, se não achar depois de 20 segundos manda um erro. 
        const iotStatus = await page
        .waitForSelector('.content_main',{ visible:true, timeout:20000 })   

    try{
    // Tira um print do element com status do dispsitivo 
    await iotStatus.screenshot({path:"screenshot-" + i + ".jpg"})
    }
    catch(err){
        console.error(`ERRO: Página de Status indisponivel`)
    } 
}
// Fecha o browser
await browser.close()