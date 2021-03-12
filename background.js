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

chrome.storage.sync.get(['isInit'], (items) => {
  console.log(items);
  if (!items.isInit) init();
  //if (!res.item) init();
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
        case "openOptionsPage":
            openOptionsPage();
            break;
        case "getTimer":
        chrome.storage.sync.get(['timer'], (items) => {
            const t = Number(items.timer);
            sendResponse({data: t});
          console.log('sendResponse');
          console.log(t);
        })
        return true;
        case "submit":
          chrome.storage.sync.get(['submit'], (items) => {
            const cnt = JSON.parse(items.submit);
            if (!cnt[message.uri]) cnt[message.uri] = 0;
            cnt[message.uri] += 1;
            chrome.storage.sync.set({'submit': JSON.stringify(cnt)});
          })
          break;
        default:
            break;
    }
});

function openOptionsPage(){
    chrome.runtime.openOptionsPage();
}
