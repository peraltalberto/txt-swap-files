import { TxtData } from "./";
import { TxtMultilineData } from "./";

/*
const mlf = new TxtMultilineData("salida.txt")
mlf.read(["diesel.map","gasolina.map","sonido.map"])
mlf.result.then((value)=>console.log(value))

const mlfe = new TxtMultilineData("entrada.txt")
mlfe.removeDataFile('entrada.map','43444');

const stf = new TxtData("202246020000039568");
stf.headers = true;
stf.readSync().then(value=>console.log(value));
*/
const valuedata = {
        "REFERENCIA":'4384',
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
mlfe.removeDataFile('entrada.map','43484');
/*
let data = {
        HEADER: {
          '10050': '',
          '10052': '',
          '10054': '',
          '10055': '',
          '10100': '0949DTY/39568',
          '10102': 'WDF63981313193995',
          '10105': '',
          '10110': '',
          '10121': '25/07/2022',
          '10190': '2',
          '10191': '2',
          '10192': '',
          '10200': 'MERCEDES-BENZ',
          '10201': 'CDI 2.2',
          '10214': 'M1',
          '10228': '0',
          '10229': '0',
          '10251': '29122005',
          '10274': '-1',
          '10300': '',
          '15010': '',
          '15100': ';41',
          '15200': '',
          '15502': '25/07/2022',
          '15503': '12:14:22',
          '15504': '12:15:27',
          '19500': '0',
          '19501': '0',
          '19510': '2',
          '19511': '2',
          '19521': '0',
          '19531': '0',
          '19532': '0',
          '19551': '',
          '19561': '0',
          '29500': '0',
          '29501': '257'
        },
        DATAOUT: {
          '30100': '0,8',
          '30101': '-0,1',
          '30130': '2,74',
          '30131': '3,29',
          '40000': '3,750',
          '40001': '4,186',
          '40010': '10',
          '40011': '31',
          '40023': '26',
          '40024': '13',
          '40030': '0,063',
          '40031': '0,236',
          '40040': '63',
          '40050': '29',
          '40117': '576',
          '40118': '702',
          '41000': '1,351',
          '41001': '2,883',
          '41010': '53',
          '41011': '63',
          '41030': '0,044',
          '41031': '0,131',
          '41050': '31',
          '42000': '3,579',
          '42001': '3,882',
          '42010': '8',
          '42011': '35',
          '42023': '20',
          '42024': '14',
          '42030': '0,035',
          '42031': '0,148',
          '42040': '73',
          '42050': '31',
          '42117': '450',
          '42118': '585',
          '43000': '15,397',
          '43001': '4,234',
          '43002': '68',
          '43003': '19',
          '43110': '0',
          '43111': '2313'
        },
        ENDOFFILE: { '999999': 'End of File' }
      }
      const stfw = new TxtData("6667");
      stfw.headers = true;
      stfw.writeDataFile(data);
      */