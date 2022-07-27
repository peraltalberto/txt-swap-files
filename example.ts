import { TxtData } from "./";
import { TxtMultilineData } from "./";


const mlf = new TxtMultilineData("salida.txt")
mlf.read(["diesel.map","gasolina.map","sonido.map"])
mlf.result.then((value)=>console.log(value))


const stf = new TxtData("202246020000039568");
stf.headers = false;
stf.readSync().then(value=>console.log(value));

const valuedata = {
        "REFERENCIA":'43444',
        "MATRICULA":'1169gcb',
        "CLIENTE":'assgura',
        "MARCA":'daf',
        "PRUEBA":'2',
        "RPM_CORTE":'3332',
        "DB_HOMO":'',
        "RPM_HOMO":'',
        "RPM_CRT_MIN":'',
        "RPM_CRT_MAX":'',
        "PLACA":'',
        "CO":'',
        "CO_ACELERADO":'',
        "LAMDA":'',
        "RMP_ACELERADO":'',
        "DEMAS":''
}
const mlfe = new TxtMultilineData("entrada.txt")
mlfe.appendSingelData('entrada.map',valuedata);