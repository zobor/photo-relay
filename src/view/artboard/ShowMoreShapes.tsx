import {
  Badge,
  Flex,
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import api from './apiServices';

const { addImageFromURL } = api;

export default function ShowMoreShapes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    const onmessage = (e: any) => {
      if (e?.data?.type === 'request-add-icon' && e?.data?.data) {
        const size = 64;
        const svg = e.data.data;
        const str = e.data?.reparse
          ? svg
              .replace('<svg ', `<svg width='${size}' height='${size}' `)
              .replace('<path ', svg.includes('fill=') ? '<path ' : '<path fill="#333" ')
          : svg;
        const dataURL = 'data:image/svg+xml,' + encodeURIComponent(str);
        addImageFromURL({
          url: dataURL,
          selectable: true,
          position: {},
          scale: 1.5,
        }).catch((err: any) => {
          toast({
            title: 'Error',
            description: err.message || 'Fail To Load Resource',
            status: 'error',
          });
        });
        toast({
          title: 'Shape created.',
          description: 'Your created a new shapre',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    };
    window.addEventListener('message', onmessage, false);

    return () => {
      window.removeEventListener('message', onmessage);
    };
  }, []);
  return (
    <>
      <Flex>
        <Badge onClick={onOpen} colorScheme="purple" cursor={'pointer'}>
          More
        </Badge>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shapes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Common</Tab>
                <Tab>Shop</Tab>
                <Tab>Logo</Tab>
                <Tab>Weather</Tab>
                <Tab>Logo</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <iframe
                    src="https://www.duelpeak.com/pages/icons/index.html?tab=1&total=1589"
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
                <TabPanel>
                  <iframe
                    src="https://www.duelpeak.com/pages/icons/index.html?tab=3&total=44"
                    style={{
                      width: 400,
                      height: 400,
                    }}
                  />
                </TabPanel>
                <TabPanel>
                  <iframe
                    src="https://www.duelpeak.com/pages/icons/index.html?tab=4&total=22"
                    style={{
                      width: 400,
                      height: 400,
                    }}
                  />
                </TabPanel>
                <TabPanel>
                  <iframe
                    src="https://www.duelpeak.com/pages/icons/index.html?tab=5&total=120"
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
