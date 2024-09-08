import { randomBytes } from "crypto";
import { existsSync, unlinkSync, appendFileSync } from "fs";
import { createInterface } from "readline";
import { Cyan, Bright, Green } from "./sub/consoleText.js";
import { execSync } from "child_process";

let envPath = './.env';
let q = `${Cyan('?')} \x1b[1m`;
let ob = { streamSalt: randomBytes(64).toString('hex') }
let rl = createInterface({ input: process.stdin,output: process.stdout });

console.log(
    `${Cyan("boas vindas ao mirage!")}\n${Bright("colocaremos você em funcionamento rapidamente.\nvamos começar criando um ")}${Cyan(".env")}${Bright(" arquivo. você sempre pode alterá-lo mais tarde.")}`
)

console.log(
    Bright("\nqual é o selfurl que usaremos? (localhost)")
)

rl.question(q, r1 => {
    if (r1) {
        ob['selfURL'] = `https://${r1}/`
    } else {
        ob['selfURL'] = `http://localhost`
    }

    console.log(Bright("\nótimo! agora, qual é a porta em que estaremos rodando? (9000)"))
    
    rl.question(q, r2 => {
        if (!r1 && !r2) {
            ob['selfURL'] = `http://localhost:9000/`
            ob['port'] = 9000
        } else if (!r1 && r2) {
            ob['selfURL'] = `http://localhost:${r2}/`
            ob['port'] = r2
        } else {
            ob['port'] = r2
        }

        final()
    });
})

let final = () => {
    if (existsSync(envPath)) {
        unlinkSync(envPath)
    }

    for (let i in ob) {
        appendFileSync(envPath, `${i}=${ob[i]}\n`)
    }

    console.log(Bright("\ncriei um arquivo .env com selfurl, porta e stream salt."))
    console.log(`${Bright("agora vou rodar")} ${Cyan("npm install")} ${Bright("para instalar todas as dependências. não deve demorar muito.\n\n")}`)
    
    execSync('npm install',{stdio:[0,1,2]});

    console.log(`\n\n${Green("tudo feito!\n")}`)
    console.log("você pode executar novamente esse script a qualquer momento para atualizar a configuração.")
    console.log("\nagora você está pronto para iniciar o projeto principal.\nse divirta!")
    
    rl.close()
}