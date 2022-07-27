import { appendFileSync, createReadStream, fstat, readFileSync } from "fs";
import * as readline from "readline";
import { imap } from "./imap";
var self: TxtMultilineData;
export class TxtMultilineData {
  private selectData: { ini: number; fin: number } = undefined;
  private mapas: any = {};
  private _result: any = {};
  private _proResult: Promise<any>;
  private mapFiles: string | string[];

  // archivo de mapeo de los datos.

  get result() {
    return this._proResult;
  }

  constructor(private path: string) {
    
  }

  public async resultSync() {
    return await this._proResult;
  }

  public appendSingelData(mapFile: string, data: any) {
    let dataRaw = readFileSync(mapFile, "utf8");
    let m = JSON.parse(dataRaw);
    let line = this.createLine(m, data)+'\n';
    appendFileSync(this.path, line, "utf8");
  }
  private createLine(mapFile: imap, data: any) {
    let line = "";
    mapFile.mapa.forEach((campo) => {
      const k = Object.keys(campo)[0];

      line += this.addChartersLeft(data[k], campo[k]);
    });
    return line;
  }
  private addChartersLeft(str: string, length: number, charter: string = " ") {
    if (charter.length != 1) {
      throw new Error("El caracter de relleno debe ser un unico caracter");
    }
    if(!str)
        str = '' ;
    const lstr = str.length;
    const nadd = length - lstr;

    for (let i = 0; i < nadd; i++) {
      str = charter + str;
    }
    return str;
  }

  public read(mapFiles: string | string[]) {
    self = this;
    this.mapFiles = mapFiles;
    if (Array.isArray(this.mapFiles)) {
      this.mapFiles.forEach((maped: string) => {
        let dataRaw = readFileSync(maped, "utf8");
        let m = JSON.parse(dataRaw);
        if (
          this.selectData != undefined &&
          Object.is(this.selectData, m.selectData)
        ) {
          throw new Error(
            "El selector de tipo de linea tiene que ser igual para todos los mapas del fichero"
          );
        }

        const typed = m.valueSelect;
        this.mapas[typed] = m;
        this.selectData = m.selectData;
      });

      this._proResult = new Promise(this.multimap);
    }
  }

  private multimap(resolve: any, reject: any) {
    let read_stream = createReadStream(self.path);
    let rl = readline.createInterface({
      input: read_stream,
    });
    rl.on("error", (err) => {
      //  console.log("end..",TxtMultilineData.result);
      reject(err);
    });
    rl.on("close", () => {
      //  console.log("end..",TxtMultilineData.result);
      resolve(self._result);
    });
    rl.on("line", async (line) => {
      // console.log(line);
      console.log(line)
      let typeData: string = line.substring(
        self.selectData.ini,
        self.selectData.fin
      );
      let sourcemap: imap = self.mapas[typeData];
      let mapa: Array<any> = sourcemap.mapa;
      let cursor = 0;
      let prueba: any = {};

      for (let i = 0; i < mapa.length; i++) {
        const key = Object.keys(mapa[i])[0];
        const size = mapa[i][key];
        // console.log(line.substring(cursor, curson+parseInt(size)).trim())
        prueba[key] = line.substring(cursor, cursor + parseInt(size)).trim();
        //console.log(prueba[key]);
        cursor += parseInt(size);
      }

      if (!self._result[prueba[sourcemap.primariKey]]) {
        self._result[prueba[sourcemap.primariKey]] = [];
      }
      self._result[prueba[sourcemap.primariKey]].push(prueba);
      //console.log( this.result[prueba[sourcemap.primariKey]]);
    });
  }
}
