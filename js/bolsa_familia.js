var height = 600
var dados = null;
var chart = null
var desenhados = ["Norte"]

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
           "% dos votos da Dilma no 1o. turno"+": "+ Math.round(e.yValue) + "%" 
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
    var local_data = dimple.filterData(dados, "regiao", desenhados);
    var myChart = new dimple.chart(svg, local_data),
        x = myChart.addMeasureAxis("x", "porc_bf"),
        y = myChart.addMeasureAxis("y", "dilma.vs.2014"),
        z = myChart.addMeasureAxis("z", "ordem_pop");
    
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
    desenhados = window.desenhados
    if (desenhados.indexOf(regiao) == -1) {
        desenhados.push(regiao)
        data = dimple.filterData(data,"regiao",desenhados)
        chart.data = data
        chart.draw(1000)
    } else {
        bolas = $("circle[class*='dimple-"+regiao.toLowerCase()+"']")
        if ($(bolas[0]).css("display") == "none") {
            bolas.show()            
        } else {
            bolas.hide()
        }
    }
    window.chart = chart
    window.desenhados = desenhados
}