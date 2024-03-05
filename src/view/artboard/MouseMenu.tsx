import Icon from '@/components/Icon';
import { Box, Center, Menu, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from './apiServices';
import { cloneDeep, isEmpty } from 'lodash';

export default function MouseMenu() {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selected = {}, setSelected] = useState<any>({});
  const { type } = selected;
  const isGroup = type === 'group';
  const showGroup = !isGroup && Array.isArray(selected?._objects) && selected?._objects?.length > 1;
  const { selectable } = selected;

  const update = () => {
    setSelected(cloneDeep(api.getSelected()));
  };
  const makeGroup = () => {
    api.markGroup();
    update();
  };
  const ungroup = () => {
    api.ungroup();
    update();
  };
  const lock = () => {
    api.noSelect();
    update();
    api.unSelectAll();
    setSelected(undefined);
  };
  const unLock = () => {
    api.canSelect();
    update();
    api.unSelectAll();
    setSelected(undefined);
  };

  const moveZ = (dir: any) => {
    api.moveDirOfZ(dir);
    api.unSelectAll();
    setSelected(undefined);
  };

  useEffect(() => {
    const contextmenu = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.target?.nodeName.toLowerCase() === 'canvas') {
        setOpen((pre: boolean) => !pre);
        setX(event.pageX);
        setY(event.pageY);
        setSelected(api.getSelected() || undefined);
      }
    };

    document.body.addEventListener('contextmenu', contextmenu);

    return () => {
      document.body.removeEventListener('contextmenu', contextmenu);
    };
  }, []);

  if (isEmpty(selected)) {
    return null;
  }

  return (
    <Box>
      {open ? <Box position={'absolute'} inset={0} zIndex={999} onClick={() => setOpen(false)} /> : null}
      <Center pos={'absolute'} left={x} top={y} zIndex={1000}>
        <Menu isOpen={open}>
          <MenuList>
            <MenuItem onClick={() => moveZ('+1')}>
              <Icon type="dir_down2" />
              <Text ml={1}>bringForward</Text>
            </MenuItem>
            <MenuItem onClick={() => moveZ('top')}>
              <Icon type="dir_up2" />
              <Text ml={1}>bringToFront</Text>
            </MenuItem>
            <MenuItem onClick={() => moveZ('-1')}>
              <Icon type="dir_down" />
              <Text ml={1}>sendBackwards</Text>
            </MenuItem>
            <MenuItem onClick={() => moveZ('bottom')}>
              <Icon type="dir_up" />
              <Text ml={1}>sendToBack</Text>
            </MenuItem>
            {selectable ? (
              <MenuItem onClick={lock}>
                <Icon type="lock" />
                <Text ml={1}>Lock</Text>
              </MenuItem>
            ) : (
              <MenuItem onClick={unLock}>
                <Icon type="unlock" />
                <Text ml={1}>UnLock</Text>
              </MenuItem>
            )}
            {showGroup ? (
              <MenuItem onClick={makeGroup}>
                <Icon type="group" />
                <Text ml={1}>Group</Text>
              </MenuItem>
            ) : null}
            {isGroup ? (
              <MenuItem onClick={ungroup}>
                <Icon type="ungroup" />
                <Text ml={1}>UnGroup</Text>
              </MenuItem>
            ) : null}
          </MenuList>
        </Menu>
      </Center>
    </Box>
  );
}
