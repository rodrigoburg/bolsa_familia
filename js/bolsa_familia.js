var height = 600
var dados = null;
var chart = null
var selecionados = ["Norte"]

function carregaDados() {
    jQuery.ajax("bolsa.csv", {
        success: function(data) {
            window.dados = csvjson.csv2json(data, {
                delim: ","
            }).rows;
            graficoNorte();
        },
        error: function() {
            console.log("Erro");
        }
    });
        
}

function arrumaTooltip(chart) {
    chart.series[0].getTooltipText = function (e) {
        return [
            "Município: " + e.aggField[0],
            "UF: " + e.aggField[1],
           "% das famílias que recebem Bolsa Família"+": "+ Math.round(e.xValue) + "%",
           "% dos votos da Dilma no 1o. turno"+": "+ Math.round(e.yValue) + "%" ,
           "População: "+ addCommas(e.zValue)
        ];
    };
    return chart;

}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}


function graficoNorte() {
    var svg = dimple.newSvg("#bolsa", window.width, window.height);
    svg[0][0].setAttribute('id', 'svg_Norte');
    var local_data = dimple.filterData(dados, "regiao", selecionados);
    var myChart = new dimple.chart(svg, local_data),
        x = myChart.addMeasureAxis("x", "porc_bf"),
        y = myChart.addMeasureAxis("y", "dilma.vs.2014"),
        z = myChart.addMeasureAxis("z", "pop.2011");
    
    x.overrideMax = 100;
    y.overrideMax = 100;
    z.overrideMax = 11316119;
    z.overrideMin = 1;
    y.title = '% de votos para Dilma'
    x.title = '% das familias que recebe Bolsa Familia'
    myChart.addSeries(["mun", "uf","regiao"], dimple.plot.bubble);
    myChart = arrumaTooltip(myChart)
    myChart.addLegend(60, 10, 800, 60, "left");
    myChart.draw();
    window.chart = myChart
}

function showRegion(regiao) {
    data = window.dados
    chart = window.chart
    selecionados = window.selecionados
    if (selecionados.indexOf(regiao) > -1) {
        selecionados.splice(selecionados.indexOf(regiao),1)
    } else {
        selecionados.push(regiao)
    }
    data = dimple.filterData(data,"regiao",selecionados)
    chart.data = data
    chart.draw()
    window.chart = chart
    window.selecionados = selecionados
}