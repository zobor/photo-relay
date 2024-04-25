import Icon from '@/components/Icon';
import useArtboardStore from '@/store/artboard';
import {
  Badge,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
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
import ResizeArtboard from './ArtboardSize';
import { rgbaToHex } from '../../common/math';
import { copy } from '../../common/dom';

const { changeTextOrShapeColor, changeStyle } = api;
const marginTop = 2;
const colorPickerStyles = { cursor: 'pointer', width: 24 };
const activeColor = '#3498db';

function Control(): any {
  const { fonts, setFonts, setFont, setColor } = usePhotoStore();
  const { changeRightPanelDetail, layer, updateLayer } = useArtboardStore();
  const { type } = layer;
  const isText = type === 'i-text';
  const isImage = type === 'image';
  const isGroup = type === 'group';
  const isRect = type === 'rect';
  const isImageCanBeColored = isImage && api.checkImageCanBeColored(layer?._element);
  const isNeedShowFill = isText || isImageCanBeColored || isRect;

  const fetchLocalFonts = () => {
    getLocalFonts().then((rs) => {
      if (Array.isArray(rs) && rs.length) {
        setFonts(rs);
      }
    });
  };

  const onFontChange = (value: string) => {
    copy(value);
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
            <Input
              defaultValue={parseInt(`${layer.width}`, 10)}
              type="number"
              onChange={(e: { target: HTMLInputElement }) => {
                const width = +e.target.value;

                updateLayer({ width });
                api.changeStyle({ width });
              }}
            />
          </InputGroup>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="height" />
            <Input
              type="number"
              defaultValue={parseInt(`${layer.height}`, 10)}
              onChange={(e: { target: HTMLInputElement }) => {
                const height = +e.target.value;

                updateLayer({ height });
                api.changeStyle({ height });
              }}
            />
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
        <Flex>
          <InputGroup size={'xs'}>
            <InputLeftAddon children="opacity" />
            <Input value={layer.opacity} type="text" disabled />
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
                defaultValue={layer.strokeWidth}
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
        <Flex gap={3}>
          <Tooltip placement="top" hasArrow label="left" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_left" onClick={() => api.setLayout('left')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="right" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_right" onClick={() => api.setLayout('right')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="top" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_top" onClick={() => api.setLayout('top')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="bottom" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_bottom" onClick={() => api.setLayout('bottom')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="x center" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_x_center" onClick={() => api.setLayout('x-center')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="y center" bg="gray.300" color="black">
            <Text>
              <Icon type="layout_y_center" onClick={() => api.setLayout('y-center')} />
            </Text>
          </Tooltip>
          <Tooltip placement="top" hasArrow label="x&y center" bg="gray.300" color="black">
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
              color={layer.fontStyle === 'italic' ? activeColor : ''}
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
              color={layer.fontWeight === 'bold' ? activeColor : ''}
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
              color={layer.underline ? activeColor : ''}
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
              color={layer.overline ? activeColor : ''}
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
              color={layer.linethrough ? activeColor : ''}
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
          <Text as="b" py={2} fontSize="xl" mt={marginTop}>
            Text Align
          </Text>
        ) : undefined}
        {isText ? (
          <Flex gap={4} fontSize={25}>
            <Icon
              type="text_align_left"
              size={30}
              fill={layer.textAlign === 'left' ? activeColor : '#000000'}
              onClick={() => {
                api.changeStyle({
                  textAlign: 'left',
                });
              }}
            />
            <Icon
              type="text_align_center"
              size={30}
              fill={layer.textAlign === 'center' ? activeColor : '#000000'}
              onClick={() => {
                api.changeStyle({
                  textAlign: 'center',
                });
              }}
            />
            <Icon
              type="text_align_right"
              size={30}
              fill={layer.textAlign === 'right' ? activeColor : '#000000'}
              onClick={() => {
                api.changeStyle({
                  textAlign: 'right',
                });
              }}
            />
            <Icon
              type="text_align_justify"
              size={30}
              fill={layer.textAlign === 'justify' ? activeColor : '#000000'}
              onClick={() => {
                api.changeStyle({
                  textAlign: 'justify',
                });
              }}
            />
          </Flex>
        ) : undefined}

        {isText ? (
          <Flex alignItems={'center'} justifyContent={'space-between'} mt={marginTop}>
            <Text as="b" py={2} fontSize="xl">
              FontFamily
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

        {isText || isImage ? (
          <Flex direction={'column'}>
            <Text as="b" fontSize="xl" mb={2}>
              Opacity
            </Text>
            <RangeSlider
              w={'95%'}
              colorScheme="pink"
              min={1}
              max={10}
              step={1}
              defaultValue={[layer.opacity ? layer.opacity * 10 : 10]}
              onChange={([v]: number[]) => {
                api.changeStyle({ opacity: +v / 10 });
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bg="tomato" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Flex>
        ) : null}

        {isText ? (
          <Flex direction={'column'}>
            <Text as="b" fontSize="xl" mb={2}>
              Font Weight
            </Text>
            <RangeSlider
              colorScheme="pink"
              w={'95%'}
              min={100}
              max={900}
              step={100}
              defaultValue={[layer.fontSize || 400]}
              onChange={([v]: number[]) => {
                api.changeStyle({ fontWeight: v });
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bg="tomato" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Flex>
        ) : null}

        {isNeedShowFill ? (
          <Flex mt={marginTop} py={2}>
            <Flex flex={1} direction={'column'} alignItems={'center'} bg="rgb(174, 214, 241)">
              <Text as="b" fontSize="xl">
                Fill
              </Text>
              <Flex direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <input
                  type="color"
                  value={rgbaToHex(layer.fill || '')}
                  style={colorPickerStyles}
                  onChange={(e) => {
                    changeTextColor(e.target.value);
                  }}
                />
                <Badge ml={4} cursor={'pointer'} colorScheme="purple" onClick={() => changeRightPanelDetail('colors')}>
                  more
                </Badge>
              </Flex>
              <Center>
                <Text fontSize={13}>{layer.fill || ''}</Text>
              </Center>
            </Flex>

            <Flex flex={1} direction={'column'} alignItems={'center'} bg="rgb(208, 236, 231)">
              <Text as="b" fontSize="xl">
                Border
              </Text>
              <Flex direction={'row'} alignItems={'center'}>
                <input
                  type="color"
                  value={rgbaToHex(layer.stroke || '')}
                  style={colorPickerStyles}
                  onChange={(e) => {
                    changeStyle({ borderColor: e.target.value });
                  }}
                />
                <Badge
                  ml={4}
                  cursor={'pointer'}
                  colorScheme="purple"
                  onClick={() => changeRightPanelDetail('borderColors')}
                >
                  more
                </Badge>
              </Flex>
              <Center>
                <Text fontSize={13}>{layer.stroke || ''}</Text>
              </Center>
            </Flex>
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

        {isRect ? (
          <Flex direction={'column'}>
            <Text as="b" fontSize="xl">
              Border Radius
            </Text>
            <InputGroup>
              <InputLeftAddon children="Border Radius" />
              <NumberInput
                defaultValue={layer.rx}
                onChange={(v) => {
                  const radius = +v;
                  if (isImage) {
                    api.changeStyle({ cornerRadius: radius });
                  } else if (isRect) {
                    api.changeStyle({ rx: radius, ry: radius });
                  }
                }}
              >
                <NumberInputField borderLeftRadius={0} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </Flex>
        ) : null}

        {isGroup ? undefined : (
          <Flex alignItems={'center'} justifyContent={'space-between'} mt={marginTop} py={2}>
            <Text as="b" fontSize="xl">
              Border Style
            </Text>
            <Badge cursor={'pointer'} colorScheme="purple" onClick={() => changeRightPanelDetail('borders')}>
              more
            </Badge>
          </Flex>
        )}

        {isGroup ? undefined : (
          <Flex flexWrap="wrap" gap={1}>
            {colors.slice(0, 16).map((color) => (
              <Button
                key={color}
                onClick={() => {
                  onChangeTextBorder({
                    borderColor: color,
                    borderWidth: 8,
                  });
                }}
                fontSize={30}
                style={{ WebkitTextStroke: `2px ${color}` } as any}
              >
                S
              </Button>
            ))}
          </Flex>
        )}
      </Flex>
    </Scrollbars>
  );
}

export default Control;
