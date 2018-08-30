// BMI值計算公式: BMI = 體重(公斤) / 身高2(公尺2)

const resultBtn = document.querySelector('.btn');
const list = document.querySelector('.list');
let data = JSON.parse(localStorage.getItem('datalist')) || [];


// EventLister

resultBtn.addEventListener('click', calculate,false);
updateInfo(data);


function calculate(e) {
    e.preventDefault();
    let height = document.querySelector('.height').value;
    let weight = document.querySelector('.weight').value;
    const getBMI = weight / (height * height)*0.1;
    let info = {
        height: height,
        weight: weight,
        BMI: getBMI,
    };
    data.push(info);
    updateInfo(data);
    localStorage.setItem('datalist', JSON.stringify(data));
}

function updateInfo(info) {
    let str = '';
    for (let i = 0; i < info.length; i++){
        str +=
            `
            <li>
                <span></span>
                <span>BMI: ${info[i].BMI}</span>
                <span>Height: ${info[i].height} cm</span>
                <span>Weight: ${info[i].weight} kg</span>
                <span>${getDate()}</span>
            </li>
            `
    }
    list.innerHTML = str;

}

function getDate() {
    let date = new Date("Aug 30, 2018");
    let str = "";
   str += (date.getMonth() + 1) + "/";
   str += date.getDate() + "/";
   str += date.getFullYear();
}
