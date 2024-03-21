import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Button,
} from '@chakra-ui/react';
import Scrollbars from 'rc-scrollbars';
import { useTheToast } from '../../hooks/useUi';
import api from './apiServices';
import colors, { palette } from './colors';

const { setBackgroundColor } = api;
const tooltipsBackgroundColor = '#f54990';

export default function ModalBgColors() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useTheToast();
  const onChangeColor = (color: string) => {
    toast({
      title: 'Change Artboard Background Color',
      description: 'Your changed the artboard color',
    });
    setBackgroundColor({ color });
    onClose();
  };
  return (
    <>
      <Tooltip placement="top" hasArrow label="Change Background Color" bg={tooltipsBackgroundColor} color="white">
        <Image
          bg="#edf2f7"
          padding="5px"
          cursor={'pointer'}
          onClick={onOpen}
          w="40px"
          borderRadius="10px"
          src="https://img.duelpeak.com/duelpeak/202312/32a2d87418e5181d77f1768455493bfba26b236a58a0cd0d8daeb53a333b2327.webp"
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Background Colors</ModalHeader>
          <ModalCloseButton />
          <ModalBody h={'40vh'}>
            <Tabs>
              <TabList>
                <Tab>Palette</Tab>
                <Tab>Colors</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Scrollbars style={{ height: '65vh' }} autoHide>
                    <Flex flexWrap="wrap" gap={1}>
                      {palette.map((item, idx) => (
                        <Flex flexWrap="wrap" gap={1} key={`bg-palette-${idx}`}>
                          <Button className="colorItem" style={{ backgroundColor: '#333', color: '#FFF' }}>
                            {idx + 1}
                          </Button>
                          {item.palette.map((color) => (
                            <Button
                              onClick={onChangeColor.bind(null, color)}
                              key={color}
                              className="colorItem"
                              style={{ backgroundColor: color }}
                            ></Button>
                          ))}
                        </Flex>
                      ))}
                    </Flex>
                  </Scrollbars>
                </TabPanel>
                <TabPanel>
                  <Scrollbars style={{ height: '65vh' }} autoHide>
                    <div className="colors">
                      {colors.map((color) => (
                        <span
                          onClick={onChangeColor.bind(null, color)}
                          key={color}
                          className="colorItem"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  </Scrollbars>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
