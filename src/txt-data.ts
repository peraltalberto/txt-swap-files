import { createReadStream, writeFileSync } from "fs";
import * as readline from "readline";
var self:TxtData;

export class TxtData {

public headers = true;
private  _result:any={};
private header = '';

constructor(private path: string, private separator:string='='){
   
}
public writeDataFile(data:any){

    writeFileSync(this.path,this.createFilecontent(data))
}
private createFilecontent(data:any){
    let content = '';
    if(this.headers){
      const heads =  Object.keys(data);
        heads.forEach((cabezera)=>{
            content += '['+cabezera+']'+'\n';
            let palabras = Object.keys(data[cabezera]);
            palabras.forEach((value:any)=>{
               content+=value+this.separator+data[cabezera][value]+'\n';
            })
        })
    }else{
        let palabras = Object.keys(data);
        palabras.forEach((value:any)=>{
           content+=value+this.separator+data[value]+'\n';
        })
    }
    return content
}

public async readSync (){
   const r = await this.read();
   return r;
}

public read(){
    self =this;
    return new Promise((resolve,reject)=>{
    let read_stream = createReadStream(self.path);
        
        let rl = readline.createInterface({
          input: read_stream
        });
        rl.on("error", (err)=>{
            //  console.log("end..",TxtMultilineData.result);
              reject(err);
          })
        rl.on("close", ()=>{
          //  console.log("end..",TxtMultilineData.result);
            resolve(self._result);
        })
        
        rl.on("line",  async (line)  =>{
            let data = line.split(self.separator)
            
            if(data.length==1){
                if(self.headers ){
                //console.log(data.length ,self.header);
                self.header = line.substring(line.indexOf('[')+1,line.indexOf(']'))
                self._result[self.header] ={};
                }
            }else{
                if(self.headers && self.header != ''){
                   // console.log(data);
                    self._result[self.header][data[0]]=data[1];    
                }else 
                self._result[data[0]] = data[1];
            }
        });
    });
}

}