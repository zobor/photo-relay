import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import ShowMorePanel from './ShowMorePanel';
import AttributePanel from './AttributePanel';
import useArtboardStore from '@/store/artboard';
import classNames from 'classnames';

const params = {
  allowTouchMove: false, // 禁用手势滑动
};

export default function TheRightPanel() {
  const [visible, setVisible] = useState<boolean>(true);
  const { rightPanelDetail } = useArtboardStore();
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (rightPanelDetail) {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(1);
      }
    } else {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(0);
      }
    }
  }, [rightPanelDetail]);

  // if (!visible) {
  //   return (
  //     <svg className="icon icon-info" onClick={() => setVisible(true)}>
  //       <use xlinkHref="#svg__icon__info" />
  //     </svg>
  //   );
  // }

  return (
    <div
      className={classNames({
        rightPanel: true,
        'toggle-right': !visible,
      })}
    >
      <div className="toggle">
        {visible ? (
          <svg className="icon icon-close" onClick={() => setVisible(false)}>
            <use xlinkHref="#svg__icon__close" />
          </svg>
        ) : (
          <svg className="icon icon-info" onClick={() => setVisible(true)}>
            <use xlinkHref="#svg__icon__info" />
          </svg>
        )}
      </div>
      {visible ? (
        <Swiper spaceBetween={50} slidesPerView={1} ref={swiperRef} {...params}>
          <SwiperSlide style={{ width: 300 }}>
            <AttributePanel />
          </SwiperSlide>
          <SwiperSlide>
            <ShowMorePanel />
          </SwiperSlide>
        </Swiper>
      ) : null}
    </div>
  );
}
