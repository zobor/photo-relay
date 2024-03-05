import { moveCenter } from '@/common/dom';
import { dataURLtoFile, downloadFile } from '@/common/file';
import { getRandString } from '@/common/math';
import Icon from '@/components/Icon';
import useArtboardStore from '@/store/artboard';
import { Center, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import api from './apiServices';
import usePhotoStore from '@/store/photo';
import { getDPR } from '../../common/client';

// const iconColor = 'rgb(142, 68, 173)';
const iconColor = '#eee';
const exportImageConfig = {
  format: 'png',
  multiplier: getDPR(),
};

export default function CenterControl() {
  const { update, scale } = useArtboardStore();
  const { addOneImage, updateStep } = usePhotoStore();

  const onExport = () => {
    const str = api.canvas.toDataURL(exportImageConfig);
    const filename = `${getRandString()}.png`;
    const file = dataURLtoFile(str, filename);
    downloadFile(file, filename);
  };
  const onSave = () => {
    const str = api.canvas.toDataURL(exportImageConfig);
    addOneImage(str);
    updateStep(2);
  };
  const zoomIn = () => {
    update({ scale: scale + 1 });
  };
  const zoomOut = () => {
    update({ scale: scale + 1 });
  };
  const updateScale = (scale: number) => update({ scale });
  useEffect(() => {
    const el: any = document.querySelector('#artboard');
    if (el) {
      el.parentNode.style.scale = scale / 100;
    }
  }, [scale]);

  return (
    <Center
      className="centerControl"
      boxShadow={'12.5px 12.5px 10px rgba(0, 0, 0, 0.035),100px 100px 80px rgba(0, 0, 0, 0.07)'}
      transform={'translateX(-50%)'}
      position={'fixed'}
      bottom={4}
      left={'50%'}
      height={30}
      bg={'rgb(39, 174, 96)'}
      borderRadius={6}
      // border={'solid 1px #f1f3f4'}
      gap={3}
      px={3}
      py={4}
    >
      <Tooltip placement="top" hasArrow label="Export Artboard" bg="gray.300" color="black">
        <Text>
          <Icon type="download" onClick={onExport} fill={iconColor} />
        </Text>
      </Tooltip>
      <Tooltip placement="top" hasArrow label="Move Artboard Into Screen Center" bg="gray.300" color="black">
        <Text>
          <Icon type="pos_center" onClick={moveCenter} fill={iconColor} />
        </Text>
      </Tooltip>

      <Tooltip placement="top" hasArrow label="Zoom Out" bg="gray.300" color="black">
        <Text userSelect={'none'} onMouseDown={zoomIn}>
          <Icon type="add" fill={iconColor} />
        </Text>
      </Tooltip>
      <Tooltip placement="top" hasArrow label="Reset Zoom" bg="gray.300" color="black">
        <>
          <Menu>
            <MenuButton color={iconColor} as={Text}>
              {scale}%
            </MenuButton>
            <MenuList style={{ transform: 'translateX(-30px)' }}>
              <MenuItem onClick={() => updateScale(30)}>30%</MenuItem>
              <MenuItem onClick={() => updateScale(50)}>50%</MenuItem>
              <MenuItem onClick={() => updateScale(80)}>80%</MenuItem>
              <MenuItem onClick={() => updateScale(100)}>100%</MenuItem>
              <MenuItem onClick={() => updateScale(130)}>130%</MenuItem>
              <MenuItem onClick={() => updateScale(150)}>150%</MenuItem>
              <MenuItem onClick={() => updateScale(200)}>200%</MenuItem>
            </MenuList>
          </Menu>
        </>
      </Tooltip>
      <Tooltip placement="top" hasArrow label="Zoom In" bg="gray.300" color="black">
        <Text onClick={zoomOut}>
          <Icon type="reduce" fill={iconColor} />
        </Text>
      </Tooltip>
      <Tooltip placement="top" hasArrow label="Save" bg="gray.300" color="black">
        <Text onClick={onSave}>
          <Icon type="save" fill={iconColor} />
        </Text>
      </Tooltip>
    </Center>
  );
}
