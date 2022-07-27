"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var txt_data_1 = require("./src/txt-data");
var txt_multiline_data_1 = require("./src/txt-multiline-data");
var mlf = new txt_multiline_data_1.TxtMultilineData("salida.txt");
mlf.read(["diesel.map", "gasolina.map", "sonido.map"]);
mlf.result.then(function (value) { return console.log(value); });
var stf = new txt_data_1.TxtData("202246020000039568");
stf.headers = false;
stf.readSync().then(function (value) { return console.log(value); });
var valuedata = {
    "REFERENCIA": '43444',
    "MATRICULA": '1169gcb',
    "CLIENTE": 'assgura',
    "MARCA": 'daf',
    "PRUEBA": '2',
    "RPM_CORTE": '3332',
    "DB_HOMO": '',
    "RPM_HOMO": '',
    "RPM_CRT_MIN": '',
    "RPM_CRT_MAX": '',
    "PLACA": '',
    "CO": '',
    "CO_ACELERADO": '',
    "LAMDA": '',
    "RMP_ACELERADO": '',
    "DEMAS": ''
};
var mlfe = new txt_multiline_data_1.TxtMultilineData("entrada.txt");
mlfe.appendSingelData('entrada.map', valuedata);
