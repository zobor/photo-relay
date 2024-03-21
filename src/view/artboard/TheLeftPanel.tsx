import Confirm from '@/components/Confirm';
import UploadImage from '@/components/UploadImage';
import usePaste from '@/hooks/usePaste';
import {
  Button,
  Center,
  Flex,
  Image,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import Scrollbars from 'rc-scrollbars';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getDPR } from '../../common/client';
import { getImageRect } from '../../common/file';
import Icon from '../../components/Icon';
import { useTheToast } from '../../hooks/useUi';
import useArtboardStore from '../../store/artboard';
import usePhotoStore from '../../store/photo';
import ShowChangeBackgroundColor from './ChangeArtboardBgColor';
import Layers from './Layers';
import ModalPhotos from './ModalPhotos';
import ShowMoreShapes from './ShowMoreShapes';
import api from './apiServices';
import config from './config';
import icons from './icons';
import Template from './template';

const { addImageFromURL, getCanvasRect, insertText, removeBackgroundImage, insertRect } = api;
const dpr = getDPR();
const tooltipsBackgroundColor = '#f54990';

export default function TheLeftPanel() {
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
  const service = useRef<Template>();

  useEffect(() => {
    service.current = new Template();
    service.current.init({
      resizeArtboard: ({ width, height }: { width: number; height: number }) => changeRect({ width, height }),
      api,
    });
  }, []);

  const onApplyTemplate = useCallback((tplId: number) => {
    api.clear();
    service.current?.run(tplId);
  }, []);

  const onClickAddText = useCallback(() => {
    insertText({
      defaultStyle: {
        ...config.textStyle,
        fill: color,
        fontFamily: font || '',
      },
    });
  }, []);
  const onClickAddRect = useCallback(() => {
    insertRect({});
  }, []);
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
        toast({
          title: 'Error',
          description: err.message || 'Fail To Add Image',
          status: 'error',
        });
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
          Insert
        </Text>
        <Flex direction={'column'} gap={1}>
          <Button onClick={onClickAddText} colorScheme="purple">
            <Center gap={2}>
              <Icon type="add" fill="#fff" />
              <span>New Text</span>
            </Center>
          </Button>
          <Button onClick={onClickAddRect} colorScheme="purple">
            <Center gap={2}>
              <Icon type="add" fill="#fff" />
              <span>New Rectangle</span>
            </Center>
          </Button>
        </Flex>
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

      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text as="b" py={2} fontSize="xl">
          Template
        </Text>
      </Flex>

      <Flex flexDirection={'column'} gap={2}>
        {service.current?.demos?.length
          ? service.current.demos.map((url: string, index: number) => (
              <Confirm
                key={url}
                title="Template Confirm"
                content="Do you want to clear the artboard and apply the template content?"
                okText="Apply Template"
                onOk={onApplyTemplate.bind(null, index + 1)}
              >
                <Img src={url} cursor={'pointer'} />
              </Confirm>
            ))
          : undefined}
      </Flex>
    </Scrollbars>
  );
}
