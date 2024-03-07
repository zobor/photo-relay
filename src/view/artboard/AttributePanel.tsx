import useArtboardStore from '@/store/artboard';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import Scrollbars from 'rc-scrollbars';
import { useEffect } from 'react';
import { getLocalFonts } from '../../common/font';
import usePhotoStore from '../../store/photo';
import api from './apiServices';
import colors, { palette } from './colors';
import ResizeArtboard from './resizeArtboard';
import Icon from '@/components/Icon';
const { changeTextOrShapeColor, changeStyle } = api;
const marginTop = 2;

function Control(): any {
  const { fonts, setFonts, setFont, setColor } = usePhotoStore();
  const { changeRightPanelDetail, layer, update } = useArtboardStore();
  const { type } = layer;
  const isText = type === 'i-text';
  const isImage = type === 'image';
  const isGroup = type === 'group';
  const isImageCanBeColored = isImage && api.checkImageCanBeColored(layer?._element);

  const fetchLocalFonts = () => {
    getLocalFonts().then((rs) => {
      if (Array.isArray(rs) && rs.length) {
        setFonts(rs);
      }
    });
  };

  const onFontChange = (value: string) => {
    setFont(value);
    changeStyle({
      fontFamily: value,
    });
  };
  const changeTextColor = (value: string) => {
    setColor(value);
    changeTextOrShapeColor(value);
  };
  const onChangeTextBorder = (attr: Record<string, string | number>) => {
    changeStyle(attr);
  };

  useEffect(() => {
    if (!fonts.length) {
      fetchLocalFonts();
    }
  }, [fonts.length]);

  if (!type) {
    return (
      <Scrollbars style={{ height: '100%' }} autoHide>
        <Flex direction="column" height={'100%'}>
          <Center>
            <Text fontSize="xl" as="b">
              Artboard
            </Text>
          </Center>
          <ResizeArtboard />
          {/* <Center flex={1}>
            <Text as="i" py={2} fontSize="xl">
              No Selected
            </Text>
          </Center> */}
        </Flex>
      </Scrollbars>
    );
  }

  return (
    <Scrollbars style={{ height: '100%' }} autoHide>
      <Flex direction="column">
        <Center>
          <Text fontSize="xl" as="b">
            Attributes
          </Text>
        </Center>
        <Text as="b" py={2} fontSize="xl">
          Basic
        </Text>
        <Flex gap={2}>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="width" />
            <Input value={parseInt(`${layer.width}`, 10)} type="number" disabled />
          </InputGroup>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="height" />
            <Input type="number" value={parseInt(`${layer.height}`, 10)} disabled />
          </InputGroup>
        </Flex>
        <Flex gap={2}>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="scaleX" />
            <Input value={(layer.scaleX || 1).toFixed(2)} type="number" disabled />
          </InputGroup>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="scaleY" />
            <Input type="number" value={(layer.scaleY || 1).toFixed(2)} disabled />
          </InputGroup>
        </Flex>
        <Flex gap={2}>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="x" />
            <Input value={parseInt(`${layer.left}`, 10)} type="number" disabled />
          </InputGroup>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="y" />
            <Input value={parseInt(`${layer.top}`, 10)} type="number" disabled />
          </InputGroup>
        </Flex>
        {isText ? (
          <Flex gap={2}>
            <InputGroup size={'xs'} flex={4}>
              <InputLeftAddon children="fontSize" />
              <Input
                defaultValue={layer.fontSize}
                type="number"
                onInput={(e: any) => {
                  if (e.target.value) {
                    api.changeStyle({ fontSize: +e.target.value });
                  }
                }}
              />
            </InputGroup>
            <InputGroup size={'xs'} flex={5}>
              <InputLeftAddon children="fontWeight" />
              <Input value={layer.fontWeight} type="text" disabled />
            </InputGroup>
          </Flex>
        ) : undefined}
        {isText ? (
          <Flex>
            <InputGroup size={'xs'}>
              <InputLeftAddon children="fontFamily" />
              <Input value={layer.fontFamily} type="text" disabled />
            </InputGroup>
          </Flex>
        ) : undefined}
        {layer.stroke ? (
          <Flex>
            <InputGroup size={'xs'}>
              <InputLeftAddon children="borderColor" />
              <Input value={layer.stroke || ''} type="text" />
            </InputGroup>
          </Flex>
        ) : undefined}
        {layer.stroke ? (
          <Flex>
            <InputGroup size={'xs'}>
              <InputLeftAddon children="borderWidth" />
              <Input
                value={layer.strokeWidth}
                type="number"
                onInput={(e: any) => {
                  onChangeTextBorder({ borderWidth: +e.target.value });
                }}
              />
            </InputGroup>
          </Flex>
        ) : undefined}

        <Text as="b" py={2} fontSize="xl" mt={marginTop}>
          Layout
        </Text>
        <Flex gap={5}>
          <Tooltip placement="top" hasArrow label="top" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_top" onClick={() => api.setLayout('top')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="right" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_right" onClick={() => api.setLayout('right')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="bottom" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_bottom" onClick={() => api.setLayout('bottom')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="left" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_left" onClick={() => api.setLayout('left')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="center" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_center" onClick={() => api.setLayout('center')} />
            </Text>
          </Tooltip>
        </Flex>

        {isText ? (
          <Text as="b" py={2} fontSize="xl" mt={marginTop}>
            Font Style
          </Text>
        ) : undefined}

        {isText ? (
          <Flex gap={2} fontSize={25}>
            <Text
              cursor={'pointer'}
              onClick={() => {
                api.changeStyle({
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  underline: false,
                  overline: false,
                  linethrough: false,
                });
              }}
            >
              Aa
            </Text>
            <Text
              as="i"
              cursor={'pointer'}
              color={layer.fontStyle === 'italic' ? 'rgb(52, 152, 219)' : ''}
              onClick={() => {
                api.changeStyle({
                  fontStyle: layer.fontStyle === 'italic' ? 'normal' : 'italic',
                });
              }}
            >
              Aa
            </Text>
            <Text
              as="b"
              cursor={'pointer'}
              color={layer.fontWeight === 'bold' ? 'rgb(52, 152, 219)' : ''}
              onClick={() => {
                api.changeStyle({
                  fontWeight: layer.fontWeight === 'bold' ? 'normal' : 'bold',
                });
              }}
            >
              Aa
            </Text>
            <Text
              cursor={'pointer'}
              textDecoration={'underline'}
              color={layer.underline ? 'rgb(52, 152, 219)' : ''}
              onClick={() => {
                api.changeStyle({
                  underline: !layer.underline,
                });
              }}
            >
              Aa
            </Text>
            <Text
              cursor={'pointer'}
              textDecoration={'overline'}
              color={layer.overline ? 'rgb(52, 152, 219)' : ''}
              onClick={() => {
                api.changeStyle({
                  overline: !layer.overline,
                });
              }}
            >
              Aa
            </Text>
            <Text
              cursor={'pointer'}
              textDecoration={'line-through'}
              color={layer.linethrough ? 'rgb(52, 152, 219)' : ''}
              onClick={() => {
                api.changeStyle({
                  linethrough: !layer.linethrough,
                });
              }}
            >
              Aa
            </Text>
          </Flex>
        ) : undefined}

        {isText ? (
          <Flex alignItems={'center'} justifyContent={'space-between'} mt={marginTop}>
            <Text as="b" py={2} fontSize="xl">
              Font Family
            </Text>
            <Badge cursor={'pointer'} colorScheme="purple" onClick={() => changeRightPanelDetail('fonts')}>
              more
            </Badge>
          </Flex>
        ) : undefined}
        {isText ? fonts.length ? null : <Spinner /> : null}
        {isText && fonts.length ? (
          <Flex gap={2} flexWrap="wrap">
            {fonts
              .filter((font) => font.length < 15)
              .slice(0, 10)
              .map((font) => (
                <Button
                  colorScheme={layer.fontFamily === font ? 'red' : 'gray'}
                  size={'xs'}
                  key={font}
                  onClick={onFontChange.bind(null, font)}
                  className="fontItem"
                  style={{
                    fontFamily: font,
                  }}
                >
                  {font}
                </Button>
              ))}
          </Flex>
        ) : null}

        {isText || isImageCanBeColored ? (
          <Flex mt={marginTop} py={2}>
            <Box flex={1}>
              <Text as="b" fontSize="xl">
                Fill
              </Text>
              <Box>
                <input
                  type="color"
                  defaultValue={layer.fill}
                  onChange={(e) => {
                    changeTextColor(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Text as="b" fontSize="xl">
                Border Color
              </Text>
              <Box>
                <input
                  type="color"
                  defaultValue={layer.stroke}
                  onChange={(e) => {
                    changeStyle({ borderColor: e.target.value });
                  }}
                />
              </Box>
            </Box>
          </Flex>
        ) : null}

        {isImageCanBeColored ? (
          <Flex alignItems={'center'} justifyContent={'space-between'} mt={marginTop}>
            <Text as="b" py={2} fontSize="xl">
              Coloring Scheme
            </Text>
            <Badge cursor={'pointer'} colorScheme="purple" onClick={() => changeRightPanelDetail('colors')}>
              more
            </Badge>
          </Flex>
        ) : null}
        {isImageCanBeColored ? (
          <Flex flexWrap="wrap" gap={1}>
            {palette.slice(0, 5).map((item, idx) => (
              <Flex flexWrap="wrap" gap={1} key={`colors-palete-${idx}`}>
                <Button className="colorItem" style={{ backgroundColor: '#333', color: '#FFF' }}>
                  {idx + 1}
                </Button>
                {item.palette.map((obj) => (
                  <Button
                    onClick={changeTextColor.bind(null, obj)}
                    key={obj}
                    className="colorItem"
                    style={{ backgroundColor: obj }}
                  ></Button>
                ))}
              </Flex>
            ))}
          </Flex>
        ) : null}
        {isGroup ? undefined : (
          <Flex alignItems={'center'} justifyContent={'space-between'} mt={marginTop}>
            <Text as="b" py={2} fontSize="xl" mt={marginTop}>
              Border Style
            </Text>
            <Badge cursor={'pointer'} colorScheme="purple" onClick={() => changeRightPanelDetail('borders')}>
              more
            </Badge>
          </Flex>
        )}
        {isGroup ? undefined : (
          <Flex flexWrap="wrap" gap={1}>
            {colors.slice(0, 12).map((color) => (
              <Button
                key={color}
                onClick={() => {
                  onChangeTextBorder({
                    borderColor: color,
                    borderWidth: 8,
                  });
                }}
                fontSize={33}
                style={{ WebkitTextStroke: `2px ${color}` } as any}
              >
                P
              </Button>
            ))}
          </Flex>
        )}
      </Flex>
    </Scrollbars>
  );
}

export default Control;
