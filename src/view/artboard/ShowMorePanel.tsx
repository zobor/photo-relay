import Icon from '@/components/Icon';
import useArtboardStore from '@/store/artboard';
import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Scrollbars from 'rc-scrollbars';
import usePhotoStore from '../../store/photo';
import api from './apiServices';
import colors, { palette } from './colors';

const { changeStyle } = api;

export default function ShowMorePanel() {
  const { fonts, font, setFonts, setFont, color, setColor } = usePhotoStore();
  const { rightPanelDetail, changeRightPanelDetail } = useArtboardStore();
  const changeTextColor = (value: string) => {
    setColor(value);
    api.changeTextOrShapeColor(value);
  };

  const onFontChange = (value: string) => {
    setFont(value);
    changeStyle({
      fontFamily: value,
    });
  };

  return (
    <Flex direction={'column'} h="100%">
      <Text
        as="b"
        onClick={() => {
          changeRightPanelDetail('');
        }}
        fontSize={20}
        cursor={'pointer'}
        pb={3}
        mb={2}
      >
        <Flex alignItems={'center'}>
          <Icon type="arrow_left" size={15} />
          Back To Attribute
        </Flex>
      </Text>
      <Scrollbars>
        {rightPanelDetail === 'colors' ? <Colors onChange={changeTextColor} /> : null}

        {rightPanelDetail === 'fonts' && fonts.length ? (
          <div className="fonts">
            {fonts.map((font) => (
              <Button
                colorScheme="gray"
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
          </div>
        ) : null}

        {rightPanelDetail === 'borders' && fonts.length ? (
          <Flex flexWrap="wrap" gap={2}>
            {colors.map((color) => (
              <Button
                key={color}
                onClick={() => {
                  api.changeStyle({
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
        ) : null}
      </Scrollbars>
    </Flex>
  );
}

function Colors({ onChange }: any) {
  return (
    <Tabs>
      <TabList>
        <Tab>Palette</Tab>
        <Tab>Colors</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0} py={2}>
          <Scrollbars style={{ height: '80vh' }} autoHide>
            <Flex flexWrap="wrap" gap={1}>
              {palette.map((item, idx) => (
                <Flex flexWrap="wrap" gap={1} key={`bg-palette-${idx}`}>
                  <Button className="colorItem" style={{ backgroundColor: '#333', color: '#FFF' }}>
                    {idx + 1}
                  </Button>
                  {item.palette.map((color) => (
                    <Button
                      onClick={onChange.bind(null, color)}
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
        <TabPanel p={0} py={2}>
          <Scrollbars style={{ height: '80vh' }} autoHide>
            <div className="colors">
              {colors.map((color) => (
                <span
                  onClick={onChange.bind(null, color)}
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
  );
}
