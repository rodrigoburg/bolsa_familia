var height = 600

var id_regiao_selected = "Norte";
var dados = null;
var enable_br = true;

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

function ativa_radio(regiao) {
    var sreg = document.Regioes.sregiao;
    for (var id = 0; id < sreg.length; id++) {
        if (sreg[id].value == regiao) jQuery(sreg[id]).attr('disabled', false);
    }
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
    var local_data = dimple.filterData(dados, "regiao", "Norte");
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
    myChart.addSeries(["mun", "uf"], dimple.plot.bubble);
    myChart = arrumaTooltip(myChart)
    myChart.addLegend(60, 10, 800, 60, "left");
    myChart.draw();
    ativa_radio("Norte");
}

function graficoCentroOeste() {
    var svg = dimple.newSvg("#bolsa", window.width, window.height);
    svg[0][0].setAttribute('id', 'svg_Centro-Oeste');
    var local_data = dimple.filterData(dados, "regiao", "Centro-Oeste");
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
        myChart.addSeries(["mun", "uf"], dimple.plot.bubble);
        myChart = arrumaTooltip(myChart)
    myChart.addLegend(60, 10, 800, 60, "left");
    myChart.draw();
    hideRegion("Centro-Oeste");
    ativa_radio("Centro-Oeste");
}

function graficoSul() {
    var svg = dimple.newSvg("#bolsa", window.width, window.height);
    svg[0][0].setAttribute('id', 'svg_Sul');
    var local_data = dimple.filterData(dados, "regiao", "Sul");
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
        myChart.addSeries(["mun", "uf"], dimple.plot.bubble);
        myChart = arrumaTooltip(myChart)
    myChart.addLegend(60, 10, 800, 60, "left");
    myChart.draw();
    hideRegion("Sul");
    ativa_radio("Sul");
}

function graficoNordeste() {
    var svg = dimple.newSvg("#bolsa", window.width, window.height);
    svg[0][0].setAttribute('id', 'svg_Nordeste');
    var local_data = dimple.filterData(dados, "regiao", "Nordeste");
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
        myChart.addSeries(["mun", "uf"], dimple.plot.bubble);
        myChart = arrumaTooltip(myChart)
    myChart.addLegend(60, 5, 800, 80, "left");
    myChart.draw();
    hideRegion("Nordeste");
    ativa_radio("Nordeste");
}

function graficoSudeste() {
    var svg = dimple.newSvg("#bolsa", window.width, window.height);
    svg[0][0].setAttribute('id', 'svg_Sudeste');
    var local_data = dimple.filterData(dados, "regiao", "Sudeste");
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
        myChart.addSeries(["mun", "uf"], dimple.plot.bubble);
        myChart = arrumaTooltip(myChart)
    myChart.addLegend(60, 10, 800, 60, "left");
    myChart.draw();
    hideRegion("Sudeste");
    ativa_radio("Sudeste");
}

function graficoBrasil() {
    var svg = dimple.newSvg("#bolsa", window.width, window.height);
    svg[0][0].setAttribute('id', 'svg_Brasil');
    var myChart = new dimple.chart(svg, dados),
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
    hideRegion("Brasil");
    ativa_radio("Brasil");
}

function hideRegion(regiao) {
    jQuery("#svg_" + regiao).hide();
}

function showRegion(regiao) {
    if (regiao == "Brasil" && enable_br) {
        enable_br = false;
        graficoBrasil();
    }
    hideRegion(id_regiao_selected);
    jQuery("#svg_" + regiao).show();
    id_regiao_selected = regiao;
}