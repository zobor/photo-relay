import { downloadText, regxOfMatchSvgFillValue, svgCodeToDataURL, updateStringFillColorByIndex } from '@/common/file';
import Icon from '@/components/Icon';
import {
  Badge,
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
import { useCallback, useMemo, useState } from 'react';
import { getRandString, rgbaToHex } from '../../common/math';
import api from './apiServices';

function xss(s: string) {
  return s.replace(/class="[^"]+"/g, '').replace(/<script/gi, '');
}

const demoSvg =
  '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4265" width="200" height="200"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="4266"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="4267"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="4268"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="4269"></path></svg>';

export default function ModalSvgEditor({ children, containerStyle }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState<string>('');
  const colors = useMemo(() => {
    const list = text.match(regxOfMatchSvgFillValue);
    if (list?.length) {
      const colorList = list.map((item: string, index: number) => {
        let color = item.replace(/fill="/, '').replace('"', '');
        if (color.includes('rgb')) {
          color = rgbaToHex(color);
        }
        return {
          color,
          index,
        };
      });
      return colorList;
    }
    return [];
  }, [text]);
  const onChangeColor = useCallback(
    (index: number, color: string) => {
      const newText = updateStringFillColorByIndex(text, index, color);
      setText(newText);
    },
    [text],
  );
  const onClickDemo = useCallback(() => {
    setText(xss(demoSvg));
    (document.querySelector('#svg-editor-textare') as any).value = demoSvg;
  }, []);

  return (
    <>
      <div style={containerStyle} onClick={onOpen}>
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            SVG Editor{' '}
            <Badge cursor={'pointer'} colorScheme="purple" onClick={onClickDemo}>
              Demo
            </Badge>
          </ModalHeader>
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
                id="svg-editor-textare"
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

            <Flex flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'}>
              {colors.map(({ color, index }) => (
                <input
                  type="color"
                  defaultValue={color}
                  key={`colors-index-${index}`}
                  style={{ width: 27 }}
                  onChange={(e: { target: HTMLInputElement }) => {
                    onChangeColor(index, e.target.value);
                  }}
                />
              ))}
            </Flex>

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
            <Flex w={'100%'} mt={2}>
              <Button
                w="100%"
                colorScheme="purple"
                disabled={isEmpty(text)}
                onClick={() => {
                  if (!isEmpty(text)) {
                    downloadText(text, `${getRandString()}.svg`);
                  }
                }}
              >
                <Icon fill="#FFF" type="download" />
                <Text ml={2}>Download The SVG</Text>
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
