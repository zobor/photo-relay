import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getCurrentDate } from '../../../common/math';
import { loadScriptSync } from '../../../common/client';

const today = getCurrentDate();

function initAd(callback?: () => void) {
  let adsbygoogle;
  loadScriptSync('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7760031923275487', {
    crossorigin: 'anonymous',
    async: true,
  }).then(() => {
    setTimeout(() => {
      (adsbygoogle = (window as any).adsbygoogle || []).push({});
    }, 1000);
    if (callback) {
      callback();
    }
  });
}

export default function AdSense() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (window.localStorage.getItem('google-adsense') === today) return;
    if (window.location.hostname !== 'www.hahahehe.cn') return;
    window.localStorage.setItem('google-adsense', today);
    onOpen();
    initAd();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <div style={{ width: '100%', height: 500, paddingTop: 60 }}>
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-6t+ed+2i-1n-4w"
                data-ad-client="ca-pub-7760031923275487"
                data-ad-slot="7820880112"
              ></ins>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
