import {
  Box,
  Checkbox,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import InputSet from '../../components/popup/InputSet';
import logo from '../../assets/img/logo.svg';

const Popup = () => {
  const [initalValue, setInitalValue] = useState(() => {
    const value = localStorage.getItem('interval');
    return value ? parseInt(value) : undefined;
  });

  const [notificationInterval, setNotificationInterval] = useState(initalValue);
  const [loading, setLoading] = useState(false);

  const handleChangeValue = (strValue: string, numValue: number) => {
    if (isNaN(numValue)) {
      setNotificationInterval(undefined);
      return;
    }
    setNotificationInterval(numValue);
  };

  const handleSetNotificationInterval = () => {
    if (!notificationInterval) {
      alert('값이 입력되지 않았습니다.');
      return;
    }
    setLoading(true);
    if (initalValue ? confirm('기존 예정된 알림은 삭제 됩니다.') : true) {
      localStorage.setItem('interval', notificationInterval.toString());
      chrome.storage.sync.set({ interval: notificationInterval });
      setInitalValue(notificationInterval);
    }
    setLoading(false);
  };

  const [openLink, setOpenLink] = useState(
    JSON.parse(localStorage.getItem('openLink') ?? 'false')
  );

  const handleOpenLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = event;
    setOpenLink(checked);
    localStorage.setItem('openLink', JSON.stringify(checked));
    chrome.storage.sync.set({ openLink: checked });
  };

  return (
    <Box p="1.5rem">
      <Heading as="h1" size="md">
        <img src={logo} />
      </Heading>
      <Flex alignItems="flex-start" flexDirection="column" gridGap="1.2rem">
        <InputSet
          labelText="알림을 받을 시간 간격을 설정해 주세요."
          buttonText={initalValue ? '수정' : '설정'}
          loading={loading}
          inputComponent={
            <NumberInput
              size="sm"
              value={notificationInterval}
              marginRight="0.5rem"
              min={1}
              width="7.5rem"
              onChange={handleChangeValue}
            >
              <NumberInputField placeholder="단위 (분)" fontSize="xs" />
            </NumberInput>
          }
          onClickButton={handleSetNotificationInterval}
        />
        <InputSet
          labelText="알림과 함께 스트레칭 영상 링크를 새탭에서 열까요?"
          showButton={false}
          inputComponent={
            <Checkbox
              colorScheme="orange"
              size="lg"
              isChecked={openLink}
              onChange={handleOpenLinkChange}
            />
          }
          onClickButton={handleSetNotificationInterval}
        />
      </Flex>
    </Box>
  );
};

export default Popup;
