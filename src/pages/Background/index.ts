const randomMessageArr = [
  '다리 꼰거 풀고 스트레칭해요~',
  '당신의 목건강을 위해 스트레칭해요~',
  '굽어가는 나의 허리. 스트레칭으로 풀어봐요~',
  '스트레칭 할 시간이네요~',
];

chrome.storage.onChanged.addListener((changes) => {
  if (changes.interval) {
    const {
      interval: { newValue, oldValue },
    } = changes;
    console.log({ changes });
    if (newValue !== oldValue) {
      chrome.alarms.clear('stretch');
      chrome.alarms.create('stretch', {
        delayInMinutes: newValue,
        periodInMinutes: newValue,
      });
    }
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm, new Date(alarm.scheduledTime).toLocaleString());
  if (alarm.name === 'stretch') {
    chrome.notifications.create('interval-stretcher', {
      type: 'basic',
      iconUrl: './icon-34.png',
      title: '스트레칭 할 시간입니다.',
      message: randomMessageArr[(Math.random() * randomMessageArr.length) | 0],
    });
    chrome.storage.sync.get('openLink', (items) => {
      items.openLink &&
        chrome.tabs.create({
          url:
            'https://www.youtube.com/results?search_query=%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%B9%AD',
          active: true,
        });
    });
  }
});
