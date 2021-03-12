let problems;
chrome.storage.sync.get(['problems', 'submit'], (item) => {
  problems = JSON.parse(item.problems);
  const submit = JSON.parse(item.submit);
  for (let i = 0; i < problems.length; ++ i) {
    const container = document.querySelector(`#problem-${i+1}`);
    container.children[0].children[1].innerText = problems[i].name;
    container.children[0].href = problems[i].uri;
    //container.children[0].children[2].innerText = problems[i].uri;
    if (submit[problems[i].uri]) {
      container.children[0].children[2].innerText = `${submit[problems[i].uri]} 회 제출`;
    }
  }
});

function init() {
  const problems = [{
    name: '3xn 타일링',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12902'
  }, {
    name: '단어 변환',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/43163'
  }, {
    name : '정수 삼각형',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/43105'
  }, {
    name: '지형이동',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/62050'
  }, {
    name: '거스름돈',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12907'
  }, {
    name: '올바른 괄호의 갯수',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12929'
  }, {
    name : 'N-Queen',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12952'
  }]
  chrome.storage.sync.set({'isInit': 'true'});
  chrome.storage.sync.set({'problems': JSON.stringify(problems)});
  chrome.storage.sync.remove(['timer']);
  chrome.storage.sync.set({'submit': JSON.stringify({})});
}

function removeProblem() {
  chrome.storage.sync.get(['problems'],(item) => {
    problems = JSON.parse(item.problems);
    const num = Number(prompt('지울 문제 순서(1~5)를 입력해주세요'));
    problems.splice(num - 1, 1);
    chrome.storage.sync.set({'problems' : JSON.stringify(problems)});
    location.reload();
  });
}

function setTimer() {
  if (confirm("2시간 뒤로 타이머를 맞추시겠습니까?")) {
    chrome.storage.sync.set({'timer': (new Date().getTime() + 60 * 60 * 2 * 1000)});
  }
}

document.querySelector('#reset-plugin').addEventListener('click', () => {
  init();
  location.reload();
});

document.querySelector('#remove-problem').addEventListener('click', ()=> {
  removeProblem();
})
document.querySelector('#set-timer').addEventListener('click', ()=> {
  setTimer();
  displayTimer();
  document.querySelector('#services').scrollIntoView();
})

function displayTimer() {
  chrome.storage.sync.get(['timer'], (items) => {
    if (items.timer) {
      const timerContainer = document.querySelector('#remain');
      const t = Number(items.timer);
      setInterval(function() {
        const remain = Number.parseInt((t - (new Date()).getTime())) / 1000;
        const min = Number.parseInt(remain / 60);
        const sec = Number.parseInt(remain % 60);
        timerContainer.innerText = `남은 시간 ${min} : ${sec}`;
      }, 1000);
      document.querySelector('#services').scrollIntoView();
    
    }
  })
}
displayTimer();