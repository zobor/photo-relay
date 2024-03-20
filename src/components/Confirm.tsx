import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useCallback } from 'react';

interface IConfirm {
  children: ReactNode;
  onOk: () => void;
  okText: string;
  content: string;
  title?: string;
}

export default function Confirm({ children, onOk, okText, content, title }: IConfirm) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickOk = useCallback(() => {
    onOk();
    onClose();
  }, []);

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title ? <ModalHeader>{title}</ModalHeader> : null}
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {content}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClickOk}>
              {okText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
