import { TxtData } from "../../src/txt-data"

declare module 'txtswapfiles'{

  export  interface imap {
 }
        
     export  interface TxtData{
        headers:boolean,
        writeDataFile(data:any):void,
        readSync():any,
        read():Promise<any>,
       }
     export interface TxtMultilineData{
        result():Promise<any>,
        resultSync():any,
        removeDataFile(mapa:string,pk:string):void,
        appendFileSync(mapFile:string,data:any):void,
        read(mapFiles: string | string[]):void,
     }
    }