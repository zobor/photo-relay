import UploadImage from '@/components/UploadImage';
import usePaste from '@/hooks/usePaste';
import { Button, Center, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from '@chakra-ui/react';
import Scrollbars from 'rc-scrollbars';
import { useRef, useState } from 'react';
import { getDPR } from '../../common/client';
import { getClipboardData, getImageRect } from '../../common/file';
import Icon from '../../components/Icon';
import { useTheToast } from '../../hooks/useUi';
import useArtboardStore from '../../store/artboard';
import usePhotoStore from '../../store/photo';
import ShowChangeBackgroundColor from './ChangeArtboardBgColor';
import Layers from './Layers';
import ShowMoreShapes from './ShowMoreShapes';
import api from './apiServices';
import config from './config';
import icons from './icons';
import ModalPhotos from './ModalPhotos';

const { addImageFromURL, getCanvasRect, insertText, removeBackgroundImage } = api;
const dpr = getDPR();
const tooltipsBackgroundColor = '#f54990';

export default function LeftControl() {
  const [visible, setVisible] = useState<boolean>(true);

  if (!visible) {
    return (
      <div className="toggle toggle-left">
        <svg className="icon icon-add" onClick={() => setVisible(true)}>
          <use xlinkHref="#svg__icon__add" />
        </svg>
      </div>
    );
  }
  return (
    <div className="leftPanel">
      <div className="toggle">
        <svg className="icon icon-close" onClick={() => setVisible(false)}>
          <use xlinkHref="#svg__icon__close" />
        </svg>
      </div>
      <Tabs>
        <TabList>
          <Tab fontWeight={'700'}>Material</Tab>
          <Tab fontWeight={'700'}>Layers</Tab>
        </TabList>

        <TabPanels style={{ height: 'calc(100vh - 70px)' }}>
          <TabPanel style={{ height: '98%', padding: 0 }}>
            <Material />
          </TabPanel>
          <TabPanel style={{ height: '98%', padding: 0 }}>
            <Layers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

function Material() {
  const uploadBackgroundImageRef = useRef<any>();
  const input = useRef<any>();
  const { font, setFonts, setFont, color, setColor } = usePhotoStore();
  const { width: artboardWidth, height: artboardHeight, changeRect } = useArtboardStore();
  const toast = useTheToast();
  const onClickAddText = () => {
    insertText({
      defaultStyle: {
        ...config.textStyle,
        fill: color,
        fontFamily: font || '',
      },
    });
  };
  const onClickShape = (url: string) => {
    addImageFromURL({
      url,
      selectable: true,
      position: {},
    }).catch((err: any) => {
      toast(err.message);
    });
  };
  const onUploadBackgroundImage = (dataURLs: string[]) => {
    const setBackGroundImage = (dataURL: string) => {
      addImageFromURL({
        url: dataURL,
        selectable: false,
        position: {},
        scale: 1,
      }).catch((err: any) => {
        toast(err.message);
      });
    };
    const [dataURL] = dataURLs;
    if (dataURL) {
      getImageRect(dataURL).then((rs: any) => {
        const { width, height } = rs;
        const artboardRect = getCanvasRect();
        if (artboardRect.width < width / dpr) {
          const newArtboardHeight = (height / width) * artboardWidth;
          changeRect({
            width: artboardWidth,
            height: Math.floor(newArtboardHeight),
          });
        } else {
          changeRect({
            width,
            height,
          });
        }
        setTimeout(() => {
          setBackGroundImage(dataURL);
        }, 0);
      });
    }
  };
  const onUploadImage = (dataURLArray: string[]) => {
    dataURLArray.forEach((dataURL: string) => {
      addImageFromURL({
        url: dataURL,
        selectable: true,
        position: {},
        scale: 1,
      }).catch((err: any) => {
        console.log(err.message);
      });
    });
  };
  const onRemoveBgImage = () => {
    removeBackgroundImage();
  };

  usePaste((dataURL: any) => {
    addImageFromURL({ url: dataURL });
  });

  return (
    <Scrollbars style={{ height: '100%' }} autoHide>
      <Flex direction={'column'}>
        <Text as="b" py={2} fontSize="xl">
          Text
        </Text>
        <Button onClick={onClickAddText} colorScheme="purple">
          <Center gap={2}>
            <Icon type="add" fill="#fff" />
            <span>New Text</span>
          </Center>
        </Button>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text as="b" fontSize="xl">
            Shape
          </Text>
          <ShowMoreShapes />
        </Flex>
        <Flex wrap="wrap" gap={1}>
          {icons.map((url) => (
            <Button size={'sm'} onClick={onClickShape.bind(null, url)} key={url}>
              <img className="material-img-item" src={url} />
            </Button>
          ))}
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text as="b" py={2} fontSize="xl">
            Background
          </Text>
        </Flex>
        <Flex direction={'column'} gap={2} flexDir={'row'}>
          <Tooltip
            placement="top"
            hasArrow
            label="Set BackgroundImage From Local File"
            bg={tooltipsBackgroundColor}
            color="white"
          >
            <Image
              bg="#edf2f7"
              cursor="pointer"
              padding="5px"
              onClick={() => uploadBackgroundImageRef.current.click()}
              src="https://img.duelpeak.com/duelpeak/202312/a1a388715b18e20ce285b61688b78df6ba2702ff47744a09058dcee9578d1ed8.webp"
              w="40px"
              borderRadius="10px"
            />
          </Tooltip>
          <ShowChangeBackgroundColor />
          <Tooltip placement="top" hasArrow label="Remove Background Image" bg={tooltipsBackgroundColor} color="white">
            <Image
              cursor="pointer"
              onClick={onRemoveBgImage}
              w="40px"
              borderRadius="10px"
              bg="#edf2f7"
              padding="5px"
              src="https://img.duelpeak.com/duelpeak/202312/8fbfe74efc4cb5b1dbc1eff78c1ff7bf9ee1fcaf2846983998862300ffee427e.webp"
            />
          </Tooltip>
          {/* <Tooltip
            placement="top"
            hasArrow
            label="Add Background Image From Clipboard"
            bg={tooltipsBackgroundColor}
            color="white"
          >
            <Image
              cursor="pointer"
              onClick={onAddBackgroundImageFromClipboard}
              w="40px"
              borderRadius="10px"
              bg="#edf2f7"
              padding="5px"
              src="https://img.duelpeak.com/duelpeak/202312/838b960c8721fc0903c01b49d7b1e0beb723e15cc7371f3bba9a01609986436f.webp"
            />
          </Tooltip> */}
          {/* <Tooltip placement="top" hasArrow label="Show More Image Material" bg={tooltipsBackgroundColor} color="white">
            <Image
              cursor="pointer"
              onClick={onRemoveBgImage}
              w="40px"
              borderRadius="10px"
              bg="#edf2f7"
              padding="5px"
              src="https://img.duelpeak.com/duelpeak/202312/38ceb74cd4ab7ae2573a19af4d60288f0d6febffffed4a231ebb40493aa04d63.webp"
            />
          </Tooltip> */}
        </Flex>
        <UploadImage onChange={onUploadBackgroundImage} myRef={uploadBackgroundImageRef} />
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text as="b" py={2} fontSize="xl">
            Image
          </Text>
        </Flex>
        <Flex direction={'column'} gap={2} flexDir={'row'}>
          <Tooltip
            placement="top"
            hasArrow
            label="Add Image From Local File"
            bg={tooltipsBackgroundColor}
            color="white"
          >
            <Image
              cursor="pointer"
              bg="#edf2f7"
              padding="5px"
              onClick={() => input.current.click()}
              src="https://img.duelpeak.com/duelpeak/202312/a1a388715b18e20ce285b61688b78df6ba2702ff47744a09058dcee9578d1ed8.webp"
              w="40px"
              borderRadius="10px"
            />
          </Tooltip>
          <ModalPhotos />
          <UploadImage onChange={onUploadImage} myRef={input} />
        </Flex>
      </Flex>
    </Scrollbars>
  );
}
