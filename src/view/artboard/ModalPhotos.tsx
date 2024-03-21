import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import api from './apiServices';

const { addImageFromURL } = api;
const tooltipsBackgroundColor = '#f54990';

export default function ModalPhotos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    const onmessage = (e: any) => {
      if (e?.data?.type === 'request-add-img' && e?.data?.data) {
        addImageFromURL({
          url: e.data.data,
          selectable: true,
          position: {},
          scale: 1,
        }).catch((err: any) => {
          toast({
            title: 'Error',
            description: err.message || 'Fail To Load Resource',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        });
        toast({
          title: 'Image created.',
          description: 'Your created a new Image',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    };
    window.addEventListener('message', onmessage, false);

    return () => {
      window.removeEventListener('message', onmessage);
    };
  }, []);
  return (
    <>
      <Tooltip placement="top" hasArrow label="Show More Image Material" bg={tooltipsBackgroundColor} color="white">
        <Image
          cursor="pointer"
          onClick={onOpen}
          w="40px"
          borderRadius="10px"
          bg="#edf2f7"
          padding="5px"
          src="https://img.duelpeak.com/duelpeak/202312/38ceb74cd4ab7ae2573a19af4d60288f0d6febffffed4a231ebb40493aa04d63.webp"
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Logo</Tab>
                <Tab>Object</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <iframe
                    src="https://www.duelpeak.com/pages/photos"
                    style={{
                      width: 400,
                      height: 400,
                    }}
                  />
                </TabPanel>
                <TabPanel>
                  <iframe
                    src="https://www.duelpeak.com/pages/icons/index.html?tab=2&total=20"
                    style={{
                      width: 400,
                      height: 400,
                    }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
