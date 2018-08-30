// BMI值計算公式: BMI = 體重(公斤) / 身高2(公尺2)
let status = '';
const resultBtn = document.querySelector('#btn');
const rmBtn = document.querySelector('.rmBtn')
const list = document.querySelector('.list');
let data = JSON.parse(localStorage.getItem('datalist')) || [];


// EventLister

resultBtn.addEventListener('click', calculate);
updateInfo(data);
rmBtn.addEventListener('click', remove);


function calculate(e) {
    e.preventDefault();
    let height = Number(document.querySelector('.height').value);
    const heightMeter = height * 0.01;//cm to m
    let weight = Number(document.querySelector('.weight').value);
    const getBMI = (weight / (heightMeter * heightMeter)).toFixed(1);

    // Value Check
    if (isNaN(height) || isNaN(weight) || height == ''|| weight == '') {
        alert('please enter number')
        return;
    };

    let info = {
        height: height,
        weight: weight,
        BMI: getBMI,
    };
    data.push(info);
    updateInfo(data);
    localStorage.setItem('datalist', JSON.stringify(data));
    window.location.reload();
}

function updateInfo(info) {
    let str = '';
    for (let i = 0; i < info.length; i++){
        str +=`
            <span class="${changeClass(info[i].BMI)}"></span>
            <li data-num="${i}">
                <span>${status}</span>
                <span>BMI: ${info[i].BMI}</span>
                <span>Height: ${info[i].height} cm</span>
                <span>Weight: ${info[i].weight} kg</span>
                <span>${getDate()}</span>
            </li>
            `
    }
    list.innerHTML = str;

}

//get Status

function changeClass(BMI) {
    if (BMI >=40) {
        status = '過度肥胖';
        return 'overWeight';
    } else if (BMI >= 35) {
        status = '中度肥胖';
        return 'fat';
    } else if (BMI >= 30) {
        status = '輕度肥胖';
        return 'heavy';
    } else if (BMI >= 25) {
        status = '肥胖'
        return 'littleHeavy'
    } else if (BMI >= 18.5) {
        status = '理想'
        return 'ideal'
    } else {
        status = '過輕';
        return 'skinny'
    }
}

function getDate() {
    const today = new Date();
    const time = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return time;
}

//Remove data records
function remove() {
    localStorage.clear();
    data = [];
    updateInfo(data);

}
