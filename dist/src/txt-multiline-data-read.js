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
exports.TxtMultilineDataRead = void 0;
var fs_1 = require("fs");
var readline = require("readline");
var self;
var TxtMultilineDataRead = /** @class */ (function () {
    function TxtMultilineDataRead(path, mapFiles) {
        var _this = this;
        this.path = path;
        this.mapFiles = mapFiles;
        this.selectData = undefined;
        this.mapas = {};
        this._result = {};
        self = this;
        if (Array.isArray(this.mapFiles)) {
            this.mapFiles.forEach(function (maped) {
                var dataRaw = (0, fs_1.readFileSync)(maped, 'utf8');
                var m = JSON.parse(dataRaw);
                if (_this.selectData != undefined && Object.is(_this.selectData, m.selectData)) {
                    throw new Error("El selector de tipo de linea tiene que ser igual para todos los mapas del fichero");
                }
                var typed = m.valueSelect;
                _this.mapas[typed] = m;
                _this.selectData = m.selectData;
            });
            this._proResult = new Promise(this.multimap);
        }
    }
    Object.defineProperty(TxtMultilineDataRead.prototype, "result", {
        // archivo de mapeo de los datos.
        get: function () {
            return this._proResult;
        },
        enumerable: false,
        configurable: true
    });
    TxtMultilineDataRead.prototype.resultSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._proResult];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TxtMultilineDataRead.prototype.multimap = function (resolve, reject) {
        var _this = this;
        var read_stream = (0, fs_1.createReadStream)(self.path);
        var rl = readline.createInterface({
            input: read_stream
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
    return TxtMultilineDataRead;
}());
exports.TxtMultilineDataRead = TxtMultilineDataRead;
