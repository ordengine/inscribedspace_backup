import { promises as fs } from 'fs';

const start = async () => {
    try {
        const response = await fetch('https://www.bitmapland.xyz/requests/data.json');
        if (!response.ok) throw new Error(`Failed to fetch data.json: ${response.status}`);
        const list = await response.json();
        const bitmapNumbers = Object.keys(list);

        console.log(bitmapNumbers);

        for (const num of bitmapNumbers) {
            try {
                const buildResponse = await fetch(`https://www.bitmapland.xyz/builds/${num}.json`);
                if (!buildResponse.ok) throw new Error(`Failed to fetch build ${num}: ${buildResponse.status}`);
                const build = await buildResponse.json();

                await fs.writeFile(`build_${num}.json`, JSON.stringify(build, null, 2), 'utf8');
                console.log(`Saved build ${num} to file`);
            } catch (error) {
                console.error(`Error processing build ${num}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error fetching list:', error.message);
    }
};

start();
