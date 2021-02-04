let problems;
chrome.storage.sync.get(['problems'], (item) => {
  problems = JSON.parse(item.problems);
  for (let i = 0; i < problems.length; ++ i) {
    const container = document.querySelector(`#problem-${i+1}`);
    container.children[0].children[1].innerText = problems[i].name;
    container.children[0].href = problems[i].uri;
    container.children[0].children[2].innerText = problems[i].uri;
  }
});

function init() {
  const problems = [{
    name: '2xn 타일링',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12900'
  }, {
    name: '스킬트리',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/49993'
  }, {
    name: '하노이탑',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12946'
  }, {
    name: '보행자 천국',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/1832'
  }, {
    name: '올바른 괄호의 갯수',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12929'
  }]
  chrome.storage.sync.set({'isInit': 'true'});
  chrome.storage.sync.set({'problems': JSON.stringify(problems)});
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
})
