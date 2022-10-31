let parHeight = 34.3;
let liHeight = 18.4;
let divDiff = 16;
let dictionaryHeight = document.getElementById("dictionary").clientHeight;
let dictionary;


// getData().then(()=>select());
// //Асинхронная функция
// async function getData(){
//     let promise = new Promise(() => {getDataBase();})
//     await promise;
// }

getDataBase();
setTimeout((function (){select()}), 1000);

function getDataBase(){
    $.ajax({
        url: '/Dictionary_war_exploded/hello-servlet',
        method: 'post',
        dataType: 'html',
        success: function (data){
            dictionary = JSON.parse(data);
                let i = [0,0];
                while (i[0] < dictionary.length)
                i = drawColumn(i);
        }
    })
}
//отрисовка Букв и Слов
function drawStationsByLetter(stations, divId, stationsAmount){
    let div = document.createElement("div");
    div.setAttribute("class", "oneLetterDiv");
    let p = document.createElement("p");
    p.innerHTML = stations[0];
    let ul = document.createElement("ul");
    for (let i = 1; i < stationsAmount; i++) {
        let li = document.createElement("li");
        li.innerHTML = stations[i];
        ul.appendChild(li);
    }
    div.appendChild(p);
    div.appendChild(ul);
    $('#' + divId).append(div);
}
//отрисовка Колонки для Букв и Слов
function drawColumn(index){
    let columnHeight = 0;
    let div = document.createElement("div");
    div.setAttribute("class", "column");
    div.setAttribute("id", "column" + index[0]);
    $('#dictionary').append(div);
    let d = 0;
    if (index[1] !== 0) {
        drawPart(dictionary[index[0]], div.id, dictionary[index[0]].length - index[1], index[1]);
        d++;
        columnHeight += (dictionary[index[0]].length - index[1]) * liHeight + divDiff;
    }
    for (let i = d; i < dictionary.length - index[0]; i++) {
        if (ifNextDivMatch(columnHeight, i + index[0])) {
            drawStationsByLetter(dictionary[i + index[0]], div.id, itemsToDraw(columnHeight, i + index[0]));
            if (itemsToDraw(columnHeight, i + index[0]) < dictionary[i + index[0]].length - 1)
                return [index[0] + i, itemsToDraw(columnHeight, i + index[0])];
        } else
            return [index[0] + i, 0];
        columnHeight += parHeight + (dictionary[i + index[0]].length - 1) * liHeight + divDiff;
    }
    return[dictionary.length, 0];
}
//
function ifNextDivMatch(currentColumnHeight, index){
    let height = parHeight + (dictionary[index].length - 1) * liHeight + divDiff;
    if (dictionary[index].length < 3) {
        return (currentColumnHeight + height <= dictionaryHeight);
    } else {
        return (currentColumnHeight + parHeight + 2 * liHeight + divDiff <= dictionaryHeight)
    }
}
//
function itemsToDraw(currentColumnHeight, index) {
    let height = parHeight + (dictionary[index].length - 1) * liHeight + divDiff;
    if (currentColumnHeight + height <= dictionaryHeight)
        return dictionary[index].length;
    else {
        height = parHeight + liHeight + divDiff;
        let amount = 0;
        while (currentColumnHeight + height <= dictionaryHeight) {
            height += liHeight;
            amount++;
        }
        return amount + 1;
    }
}
//
function drawPart(stations, divId, stationsAmount, index) {
    let div = document.createElement("div");
    div.setAttribute("class", "oneLetterDiv")
    let ul = document.createElement("ul");
    for (let i = index; i < index + stationsAmount; i++) {
        let li = document.createElement("li");
        li.innerHTML = stations[i];
        ul.appendChild(li);
    }
    div.appendChild(ul);
    $('#' + divId).append(div);
}

