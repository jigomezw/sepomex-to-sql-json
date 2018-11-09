var fs = require('fs'),
    xml2js = require('xml2js')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

let inputFile = __dirname + '/Tlaxcala.xml'
let outputFile = __dirname + '/Tlaxcala.json'

con.connect(function (err) {
    if (err) throw err;
    var parser = new xml2js.Parser()
    fs.readFile(inputFile, function (err, data) {
        parser.parseString(data, function (err, result) {
            //
            result.NewDataSet.table.forEach(function (element) {
                //
                let params = {
                    d_codigo: (element.d_codigo ? element.d_codigo[0] : ''),
                    d_asenta: (element.d_asenta ? element.d_asenta[0] : ''),
                    d_tipo_asenta: (element.d_tipo_asenta ? element.d_tipo_asenta[0] : ''),
                    D_mnpio: (element.D_mnpio ? element.D_mnpio[0] : ''),
                    d_estado: (element.d_estado ? element.d_estado[0] : ''),
                    d_ciudad: (element.d_ciudad ? element.d_ciudad[0] : ''),
                    d_CP: (element.d_CP ? element.d_CP[0] : ''),
                    c_estado: (element.c_estado ? element.c_estado[0] : ''),
                    c_oficina: (element.c_oficina ? element.c_oficina[0] : ''),
                    c_CP: (element.c_CP ? element.c_CP[0] : ''),
                    c_tipo_asenta: (element.c_tipo_asenta ? element.c_tipo_asenta[0] : ''),
                    c_mnpio: (element.c_mnpio ? element.c_mnpio[0] : ''),
                    id_asenta_cpcons: (element.id_asenta_cpcons ? element.id_asenta_cpcons[0] : ''),
                    d_zona: (element.d_zona ? element.d_zona[0] : ''),
                    c_cve_ciudad: (element.c_cve_ciudad ? element.c_cve_ciudad[0] : '')
                }
                let sql = "INSERT INTO zipcodes set d_codigo='" + (params.d_codigo) + "', d_asenta='" + (params.d_asenta) + "', d_tipo_asenta='" + (params.d_tipo_asenta) + "', D_mnpio='" + (params.D_mnpio) + "', d_estado='" + (params.d_estado) + "', d_ciudad='" + (params.d_ciudad) + "', d_CP='" + (params.d_CP) + "', c_estado='" + (params.c_estado) + "', c_oficina='" + (params.c_oficina) + "', c_CP='" + (params.c_CP) + "', c_tipo_asenta='" + (params.c_tipo_asenta) + "', c_mnpio='" + (params.c_mnpio) + "', id_asenta_cpcons='" + (params.id_asenta_cpcons) + "', d_zona='" + (params.d_zona) + "', c_cve_ciudad='" + (params.c_cve_ciudad) + "';"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("record inserted from "+params.d_asenta);
                });
            });

            // close connection
            con.end();

            fs.writeFile(outputFile, JSON.stringify(result.NewDataSet.table), (err) => {
                if (err) throw err;
            });
        })
    })    
});