import { svgCodeToDataURL } from '@/common/file';
import Icon from '@/components/Icon';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import api from './apiServices';

function xss(s: string) {
  return s.replace(/class="[^"]+"/g, '');
}

export default function ModalSvgEditor({ children, containerStyle }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState<string>('');
  return (
    <>
      <div style={containerStyle} onClick={onOpen}>
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SVG Editor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w={'100%'} display={'none'}>
              <Button w="100%" colorScheme="purple">
                <Icon fill="#FFF" type="upload" />
                <Text ml={2}>Upload SVG File</Text>
              </Button>
            </Flex>
            <Flex mt={2} mb={2}>
              <Textarea
                h={200}
                placeholder="Paste SVG Code Here"
                onChange={(e: { target: HTMLTextAreaElement }) => {
                  setText(xss(e.target.value).trim());
                }}
              ></Textarea>
            </Flex>
            <Box>
              <span
                className="svgViewBox"
                dangerouslySetInnerHTML={{
                  __html: text || 'Waiting For Your Svg Code',
                }}
              />
            </Box>
            <Flex w={'100%'} mt={2}>
              <Button
                w="100%"
                colorScheme="purple"
                disabled={isEmpty(text)}
                onClick={() => {
                  if (!isEmpty(text)) {
                    const svgURL = svgCodeToDataURL(text);
                    api.addImageFromURL({
                      url: svgURL,
                    });
                  }
                  onClose();
                }}
              >
                <Icon fill="#FFF" type="add" />
                <Text ml={2}>Insert To Artboard</Text>
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
