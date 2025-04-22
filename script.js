'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// テスト用関数
function test(actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
      console.log("OK! Test PASSED.  actual:" + actual);
  }
  else {
      console.group("Test FAILED. Try again!");
      console.log("    actual: ", actual);
      console.log("  expected: ", expected);
      console.trace();
  }
}


// 設定の文言を定義する
const objCommitment = {
  demo: {
    label:"デモ用", 
    timeSoaking: 0.1 , 
    timeBurning: 0.1, 
    timeSteaming: 0.1 ,
    washingRice: "米を研ぐ",
    waterAmount: "水",
    riceSoaking: "夏は30分以上 冬は60分以上浸水させる",
    heatControl: "強火にする"
  },
  quick: {
    label:"時短", 
    timeSoaking: 60 , 
    timeBurning: 8, 
    timeSteaming: 10 ,
    washingRice: "米を研ぐ",
    waterAmount: "水",
    riceSoaking: "夏は30分以上 冬は60分以上浸水させる",
    heatControl: "強火にする"
  },
  standard: {
    label: "標準", 
    timeSoaking: 60, 
    timeBurning: 10, 
    timeSteaming: 10, 
    washingRice: "米を研ぐ",
    waterAmount: "水",
    riceSoaking: "夏は30分以上 冬は60分以上浸水させる",
    heatControl: "中火にする"
  }, 
  slow: {
    label: "こだわり", 
    timeSoaking: 120, 
    timeBurning: 10, 
    timeSteaming: 15, 
    washingRice: "拝み洗いをする(軽い力で1合あたり20回目安)",
    waterAmount: "水",
    riceSoaking: "2時間以上浸水させる",
    heatControl: "弱めの中火にする"
  },
  slower: {
    label: "超こだわり", 
    timeSoaking: 120, 
    timeBurning: 10, 
    timeSteaming: 15, 
    washingRice: "拝み洗いをする(軽い力で1合あたり20回目安)",
    waterAmount: "氷数個と水",
    riceSoaking: "冷蔵庫で2時間以上浸水させる",
    heatControl: "約10分で沸騰するよう火加減を調整する"
  }
};

const objWaterAmount = {
  soft: 2.6,
  normal: 2.5,
  hard: 2.4,
  friedRice: 2.3
}

// ついてくるタイマー用メソッド
const divStickyTimer = {
  div: () => {
    return document.getElementById("stickyTimer");
  },
  class: (cls) => {
    return document.getElementById("stickyTimer").querySelector(`.${cls}`);
  },
  style: (cls) => {
    return document.getElementById("stickyTimer").querySelector(`.${cls}`).style;
  },
  arrClass: (cls) => {
    return document.getElementsByClassName(cls);
  }
} 

// 時間計算用メソッド
const timeCalc = {
  getNow: () => {
    return new Date();
  },
  diffSecond: (now, diffTime) => {
    return (diffTime.getTime() - now.getTime())  / 1000;
  },
  addMinuts: (baseTime, min) => {
    return new Date(baseTime.setTime(baseTime.getTime() + (min * 60 * 1000)));
  }
};


// こだわり設定取得
let myCommitment; // {} object
function getCommitment(){
  const commitments = document.getElementsByName("selectCommitment");
  for (const commitment of commitments) {
    if (commitment.checked) {
      return objCommitment[commitment.value];
    }
  }
}


//　水加減設定
function getVolume(volume) {
  const elements = document.getElementsByName("hardnessOfRice");
  for (const element of elements) {
    if (element.checked === true && volume > 0) {
      return volume * objWaterAmount[element.value];
    }
  } 
  window.alert("お米の量を入力してください");
}

let waterAmount = 0;
// 分量セット 設定ボタン
function setCommitment() {
  myCommitment = getCommitment();
  // console.log(myCommitment); // 確認用
  
  const volume = document.getElementById("inputVolume").value;
  waterAmount = getVolume(volume);
  if (waterAmount > 0) {
    // 見出しの設定
    divStickyTimer.class("commitment").innerHTML = `<b>【${myCommitment.label}】</b>  ただいま <a href="#preparation">下ごしらえ</a>中`; 
    divStickyTimer.class("navigator").innerHTML = `お米の量: <b>${volume}</b> g  お米と水の総重量: <b>${waterAmount}</b> g `; 
    divStickyTimer.class("timeCounter").innerText = "--:--:--"; 
    divStickyTimer.div().style.display = "block";

    // 可変の文字列を設定
    document.getElementById("riceAmount").innerText = `${volume} gのお米を鍋にいれる`;
    document.getElementById("waterAmount").innerText = `${myCommitment.waterAmount}を入れ重量が${waterAmount} gにする`;
    document.getElementById("burning").innerText = `蓋をして ${myCommitment.timeBurning} 分のタイマーをセットする`;
    document.getElementById("steaming").innerHTML = `${myCommitment.timeSteaming} 分間蒸らす <p>絶対を蓋を開けないこと！</p>`;
    document.getElementById("washingRice").innerText = myCommitment.washingRice;
    document.getElementById("riceSoaking").innerText = myCommitment.riceSoaking;
    document.getElementById("heatControl").innerText = myCommitment.heatControl;

    // レシピを表示
    const arrClass = document.getElementsByClassName("recipe");
    for (const element of arrClass) {
      element.style.display = "block";
    }
  }
}


// // こだわり設定リセットボタン リセットをリロードボタンにして廃止
// function resetCommitment(){
//   // document.getElementById("stickyTimer").style.display = "none";
//   divStickyTimer.div().style.display = "none";
//   const commitments = document.getElementsByName("selectCommitment");
//   commitments.forEach((element) => { 
//     if (element.value === "quick") {
//       element.checked = true;
//     }
//   });

//   const elementsHardness = document.getElementsByName("hardnessOfRice");
//   elementsHardness.forEach((element) => {
//     if (element.value === "normal"){
//       element.checked = true;
//     }
//   });

//   //　見出しのリセット
//   divStickyTimer.class("commitment").innerText = "設定内容";
//   divStickyTimer.class("navigator").innerHTML = "設定中"; 
//   divStickyTimer.class("timeCounter").innerText = "--:--:--"; 
//   document.getElementById("inputVolume").value = "";
// }

// stickTimerカウントダウン
let tmrEndDate; // Date型
function countDown() {
  let countId;
  function displayUpdate() {
    const diffTime = tmrEndDate.getTime() - new Date().getTime();    
    if (diffTime >= 0) {
      const resultDate = new Date(diffTime - (9 * 60 * 60 * 1000));
      let hour = resultDate.getHours().toString();
      let min = resultDate.getMinutes().toString().padStart(2, "0");
      let sec = resultDate.getSeconds().toString().padStart(2, "0");
      divStickyTimer.class("timeCounter").innerText = `残り時間は: ${hour}:${min}:${sec}`; 
      countId = setTimeout(displayUpdate, 1000);
    } else {
      switch (progress) {
        case "heatControl":
          window.alert("強火にしてパチパチ音がしたら火を止める。 次は蒸らしです。")
          divStickyTimer.class("commitment").innerHTML = `<b>【${myCommitment.label}】</b>  ただいま <a href="#ankSteaming">蒸らし</a>中`; 
          divStickyTimer.class("navigator").innerHTML = '絶対に蓋をとるな！！'; 
          steamingTask();
          break;
        case "steaming":
          document.getElementById("stickyTimer").style.display = "none";
          window.alert("お〜〜〜い！米が炊けたぞぃ🍚🍚🍚🍚🍚🍚🍚" + tmrEndDate);
          break;
      }
      clearTimeout(countId);
    }
  }
  return displayUpdate;
}

// テストコード　タイマーを動かす
// let endDate = new Date(new Date().getTime() + 30000);
// let fncTest = countDown(endDate);

// 変数宣言タイマーの終了時刻用
// let tmrEndDate; // Date型

// stickTimerカウントアップ
let countUpId; // カウンターID
let tmrStartDate;

function countUp(date) {
  tmrStartDate = date;
  function displayUpdate() {
    const diffTime = new Date().getTime() - tmrStartDate.getTime();
    if (diffTime >= 0) {
      const resultDate = new Date(diffTime - (9 * 60 * 60 * 1000));
      let hour = resultDate.getHours().toString();
      let min = resultDate.getMinutes().toString().padStart(2, "0");
      let sec = resultDate.getSeconds().toString().padStart(2, "0");
      divStickyTimer.class("timeCounter").innerText = `${hour}:${min}:${sec} 経過`; 
      countUpId = setTimeout(displayUpdate, 1000);
    }
  }
  return displayUpdate;
}

// let stopWatch = countUp(new Date());






//new Date(baseTime.setTime(baseTime.getTime() + (this.time * 60 * 1000)));

/* チェックボックスの処理 */
// タスク完了処理
function checkboxOnChange() {
  const cplTask = document.getElementsByClassName("completeTask");
  for (const element of cplTask) {
    if (element.checked) {
      element.parentElement.innerText = element.value;
      element.disabled = true;
    } 
  }
}


// 研ぎ終わりの処理
const elemRiceAmount = document.getElementById("cplRiceAmount");
elemRiceAmount.addEventListener('click', function () {
  checkboxOnChange();
  const baseTime = new Date();
  const addMinuts = myCommitment.timeSoaking;
  tmrEndDate = new Date(baseTime.setTime(baseTime.getTime() + (addMinuts * 60 * 1000)));
  // countDown(tmrEndDate)()
  divStickyTimer.class("commitment").innerHTML = `<b>【${myCommitment.label}】</b>  ただいま<a href="#soaking">浸水</a>中`; 
  divStickyTimer.class("navigator").innerHTML = '次の工程は <a href="#cooking">炊飯</a>'; 
  let hour = tmrEndDate.getHours().toString();
  let min = tmrEndDate.getMinutes().toString().padStart(2, "0");
  divStickyTimer.class("timeCounter").innerText = `${hour}:${min}まで浸水時間`; 
});

// 工程用フラグ
let progress;

// 火入れからの表示は関数で対応
function heatControlTask(){
  let cdTimer = countDown();
  tmrEndDate = new Date(new Date().getTime() + (myCommitment.timeBurning * 60 * 1000)); 
  progress = "heatControl";
  cdTimer();
}

// 浸水完了後の処理  
const elemcplRiceSoaking = document.getElementById("cplRiceSoaking");
elemcplRiceSoaking.addEventListener('click', function () {
  checkboxOnChange();
  divStickyTimer.class("commitment").innerHTML = `<b>【${myCommitment.label}】</b>  これから <a href="#cooking">炊飯</a>`; 
  divStickyTimer.class("navigator").innerHTML = `タイマー ${myCommitment.timeBurning} 分 <input type="button" value="タイマー開始" onclick="heatControlTask()">`; 
  divStickyTimer.class("timeCounter").innerText = "--:--:--"; 
  // divStickyTimer.class("timerButton").style.display = "flex";
});

// 蒸らしも表示は関数で対応　まとめたいですね
function steamingTask(){
  let cdTimer = countDown();
  tmrEndDate = new Date(new Date().getTime() + (myCommitment.timeBurning * 60 * 1000)); 
  progress = "steaming";
  cdTimer();
}

// // 次工程へ
// const btnHeatControl = document.getElementById("btnNextProcces");
// btnHeatControl.addEventListener('click', function () {
//   console.log("aaaaa");
// });

// // カウントアップ用のボタン無効にする　一旦未使用
// function heatControlNext() {
//   const arr = document.getElementById("stickyTimer").getElementsByTagName("input");
//   for (const elem of arr) {
//     if (elem.id !== "btnNextProcces") {
//         elem.style.display = "none";
//     }
//   }
// }
