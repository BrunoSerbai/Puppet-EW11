export const resetEW11 = async (page) => {
    const ip = process.env.DEVICE_IP || '10.10.100.254';
    
    await page.goto(`http://${ip}/others.html`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#restart') 
    try {
        page.once('dialog', async dialog => {
            await dialog.accept(); 
        })
        await page.click('#restart')
    } catch (error) {
        console.error('Error clicking button:', error)
    }
}