import { rx } from '@/common/rx';
import Empty from '@/components/Empty';
import useArtboardStore from '@/store/artboard';
import { Center, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { cloneDeep, debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import api from './apiServices';

const { getSelectedType, selectById, getSelected } = api;

export default function Layers() {
  const [list, setList] = useState<any>([]);
  const { selectedId, update } = useArtboardStore();

  const onSelect = useCallback((id: string) => {
    selectById(id);
    update({ selectedId: id });
  }, []);

  const getList = useCallback(() => {
    if (api.canvas && api.canvas.getObjects) {
      const list = api.canvas.getObjects().map((item: any) => ({
        ...item,
        type: getSelectedType(item),
      }));

      return list;
    }
  }, []);

  useEffect(() => {
    const updatePosition = debounce((data: any) => {
      update({ selectedId: data.id, layer: cloneDeep(data) });
    }, 10);
    // const updateLayer = debounce((data: any) => {
    //   update({ layer: cloneDeep(data) });
    // }, 100);
    const sub$ = rx.subscribe(({ type, data = {} }: any) => {
      switch (type) {
        case 'selection:updated':
          update({ selectedId: data.id, layer: getSelected() });
          break;
        case 'selection:created':
          update({ selectedId: data.id, layer: getSelected() });
          break;
        case 'selection:cleared':
          update({ selectedId: undefined, layer: {} });
          break;
        case 'object:added':
          setList(getList());
          break;
        case 'object:removed':
          setList(getList());
          update({ selectedId: undefined, layer: {} });
          break;
        case 'object:moving':
          updatePosition(data);
          break;
        case 'object:modified':
          updatePosition(data);
          break;
        case 'object:scaling':
          updatePosition(data);
          break;
        case 'after:render':
          // update({ layer: cloneDeep(getSelected() || {}) });
          break;
      }
    });

    return () => {
      sub$.unsubscribe();
    };
  }, [getList]);

  if (!list?.length) {
    return (
      <Center mt={100}>
        <Empty text="No Layers" />
      </Center>
    );
  }

  return (
    <Flex flexDirection={'column'}>
      <TableContainer>
        <Table size="sm" py={2}>
          <Thead>
            <Tr>
              <Th>IDX</Th>
              <Th>Type</Th>
              <Th>Desc</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item: any, index: number) => (
              <Tr
                cursor={'pointer'}
                key={item.id}
                onClick={() => onSelect(item.id)}
                bg={selectedId === item.id ? 'rgb(46, 204, 113)' : '#FFF'}
                color={selectedId === item.id ? '#FFF' : '#333'}
              >
                <Td>{index + 1}</Td>
                <Td>{item.type}</Td>
                <Td>{item.type === 'i-text' ? item.text : '--'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
