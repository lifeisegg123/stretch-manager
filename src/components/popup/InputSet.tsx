import { Button, Box, Flex, Text } from '@chakra-ui/react';
import { FC, MouseEventHandler, ReactElement } from 'react';

interface IProps {
  loading?: boolean;
  inputComponent: ReactElement;
  onClickButton?: MouseEventHandler<HTMLButtonElement>;
  showButton?: boolean;
  labelText?: string;
  buttonText?: string;
}

const InputSet: FC<IProps> = ({
  labelText,
  loading,
  inputComponent,
  onClickButton,
  buttonText,
  showButton = true,
}) => {
  return (
    <Flex flexDirection="column" gridGap="0.25rem">
      <Text color="GrayText" whiteSpace="nowrap">
        {labelText}
      </Text>
      <Flex gridGap="0.5rem">
        {inputComponent}
        {showButton && (
          <Button
            colorScheme="orange"
            size="sm"
            isLoading={loading}
            onClick={onClickButton}
          >
            {buttonText}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default InputSet;
