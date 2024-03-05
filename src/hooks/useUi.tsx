import { useToast } from '@chakra-ui/react';
import { isError, isObject } from '../common/is';

const defaultToastProps = {
  title: 'Change Artboard Background Color',
  description: 'Your changed the artboard color',
  duration: 2000,
  isClosable: true,
};

export function useTheToast() {
  const toast = useToast();

  return (message: any) => {
    if (isError(message)) {
      toast({ ...defaultToastProps, title: 'Error!', description: message.message, status: 'error' });
    } else if (typeof message === 'string') {
      toast({ ...defaultToastProps, title: 'Success', description: message, status: 'success' });
    } else if (isObject(message)) {
      toast({ ...defaultToastProps, status: 'success', ...message });
    }
  };
}
