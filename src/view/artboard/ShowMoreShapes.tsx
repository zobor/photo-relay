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
const iframeStyle = {
  width: 800,
  height: 600,
};

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
      <Flex>
        <Badge onClick={onOpen} colorScheme="purple" cursor={'pointer'}>
          More
        </Badge>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={iframeStyle.width + 100} maxWidth={iframeStyle.width + 100}>
          <ModalHeader>Shapes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Common</Tab>
                <Tab>Shop</Tab>
                <Tab>Logo</Tab>
                <Tab>Weather</Tab>
                <Tab>Objects</Tab>
                <Tab>Cartoon</Tab>
                <Tab>Tech</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=1&total=991" style={iframeStyle} />
                </TabPanel>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=2&total=20" style={iframeStyle} />
                </TabPanel>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=3&total=164" style={iframeStyle} />
                </TabPanel>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=4&total=113" style={iframeStyle} />
                </TabPanel>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=5&total=75" style={iframeStyle} />
                </TabPanel>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=6&total=100" style={iframeStyle} />
                </TabPanel>
                <TabPanel>
                  <iframe src="https://www.duelpeak.com/pages/icons/index.html?tab=7&total=204" style={iframeStyle} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
