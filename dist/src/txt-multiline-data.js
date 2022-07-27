"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxtMultilineData = void 0;
var fs_1 = require("fs");
var readline = require("readline");
var self;
var TxtMultilineData = /** @class */ (function () {
    function TxtMultilineData(path) {
        this.path = path;
        this.selectData = undefined;
        this.mapas = {};
        this._result = {};
    }
    Object.defineProperty(TxtMultilineData.prototype, "result", {
        // archivo de mapeo de los datos.
        get: function () {
            return this._proResult;
        },
        enumerable: false,
        configurable: true
    });
    TxtMultilineData.prototype.resultSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._proResult];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TxtMultilineData.prototype.removeDataFile = function (mapa, pk) {
        return __awaiter(this, void 0, void 0, function () {
            var r, k, content;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.read(mapa);
                        return [4 /*yield*/, this.resultSync()];
                    case 1:
                        r = _a.sent();
                        delete r[pk];
                        k = Object.keys(r);
                        content = '';
                        k.forEach(function (insp) {
                            r[insp].forEach(function (dataline) {
                                content += _this.createLine(_this.mapas, dataline) + "\n";
                            });
                        });
                        (0, fs_1.writeFileSync)(this.path, content, "utf8");
                        return [2 /*return*/];
                }
            });
        });
    };
    TxtMultilineData.prototype.appendSingelData = function (mapFile, data) {
        var dataRaw = (0, fs_1.readFileSync)(mapFile, "utf8");
        var m = JSON.parse(dataRaw);
        var line = this.createLine(m, data) + "\n";
        (0, fs_1.appendFileSync)(this.path, line, "utf8");
    };
    TxtMultilineData.prototype.createLine = function (mapFile, data) {
        var _this = this;
        var line = "";
        mapFile.mapa.forEach(function (campo) {
            var k = Object.keys(campo)[0];
            line += _this.addChartersLeft(data[k], campo[k]);
        });
        return line;
    };
    TxtMultilineData.prototype.addChartersLeft = function (str, length, charter) {
        if (charter === void 0) { charter = " "; }
        if (charter.length != 1) {
            throw new Error("El caracter de relleno debe ser un unico caracter");
        }
        if (!str)
            str = "";
        var lstr = str.length;
        var nadd = length - lstr;
        for (var i = 0; i < nadd; i++) {
            str = charter + str;
        }
        return str;
    };
    TxtMultilineData.prototype.read = function (mapFiles) {
        var _this = this;
        self = this;
        this.mapFiles = mapFiles;
        if (Array.isArray(this.mapFiles)) {
            console.log('array multilina');
            this.mapFiles.forEach(function (maped) {
                var dataRaw = (0, fs_1.readFileSync)(maped, "utf8");
                var m = JSON.parse(dataRaw);
                if (_this.selectData != undefined &&
                    Object.is(_this.selectData, m.selectData)) {
                    throw new Error("El selector de tipo de linea tiene que ser igual para todos los mapas del fichero");
                }
                var typed = m.valueSelect;
                _this.mapas[typed] = m;
                _this.selectData = m.selectData;
            });
            this._proResult = new Promise(this.multimap);
        }
        else {
            if (typeof mapFiles === "string") {
                var dataRaw = (0, fs_1.readFileSync)(mapFiles, "utf8");
                var m = JSON.parse(dataRaw);
                this.mapas = m;
                this._proResult = new Promise(this.singelmap);
            }
            else {
                throw new Error("El tipo de ruta no es posible tratarlo.");
            }
        }
    };
    TxtMultilineData.prototype.multimap = function (resolve, reject) {
        var _this = this;
        var read_stream = (0, fs_1.createReadStream)(self.path);
        var rl = readline.createInterface({
            input: read_stream,
        });
        rl.on("error", function (err) {
            //  console.log("end..",TxtMultilineData.result);
            reject(err);
        });
        rl.on("close", function () {
            //  console.log("end..",TxtMultilineData.result);
            resolve(self._result);
        });
        rl.on("line", function (line) { return __awaiter(_this, void 0, void 0, function () {
            var typeData, sourcemap, mapa, cursor, prueba, i, key, size;
            return __generator(this, function (_a) {
                typeData = line.substring(self.selectData.ini, self.selectData.fin);
                sourcemap = self.mapas[typeData];
                mapa = sourcemap.mapa;
                cursor = 0;
                prueba = {};
                for (i = 0; i < mapa.length; i++) {
                    key = Object.keys(mapa[i])[0];
                    size = mapa[i][key];
                    // console.log(line.substring(cursor, curson+parseInt(size)).trim())
                    prueba[key] = line.substring(cursor, cursor + parseInt(size)).trim();
                    //console.log(prueba[key]);
                    cursor += parseInt(size);
                }
                if (!self._result[prueba[sourcemap.primariKey]]) {
                    self._result[prueba[sourcemap.primariKey]] = [];
                }
                self._result[prueba[sourcemap.primariKey]].push(prueba);
                return [2 /*return*/];
            });
        }); });
    };
    TxtMultilineData.prototype.singelmap = function (resolve, reject) {
        var _this = this;
        var read_stream = (0, fs_1.createReadStream)(self.path);
        var rl = readline.createInterface({
            input: read_stream,
        });
        rl.on("error", function (err) {
            //  console.log("end..",TxtMultilineData.result);
            reject(err);
        });
        rl.on("close", function () {
            //  console.log("end..",TxtMultilineData.result);
            resolve(self._result);
        });
        rl.on("line", function (line) { return __awaiter(_this, void 0, void 0, function () {
            var sourcemap, mapa, cursor, prueba, i, key, size;
            return __generator(this, function (_a) {
                // console.log(line);
                console.log(self.mapas);
                sourcemap = self.mapas;
                mapa = sourcemap.mapa;
                cursor = 0;
                prueba = {};
                for (i = 0; i < mapa.length; i++) {
                    key = Object.keys(mapa[i])[0];
                    size = mapa[i][key];
                    // console.log(line.substring(cursor, curson+parseInt(size)).trim())
                    prueba[key] = line.substring(cursor, cursor + parseInt(size)).trim();
                    //console.log(prueba[key]);
                    cursor += parseInt(size);
                }
                if (!self._result[prueba[sourcemap.primariKey]]) {
                    self._result[prueba[sourcemap.primariKey]] = [];
                }
                self._result[prueba[sourcemap.primariKey]].push(prueba);
                return [2 /*return*/];
            });
        }); });
    };
    return TxtMultilineData;
}());
exports.TxtMultilineData = TxtMultilineData;
