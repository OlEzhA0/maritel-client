import cn from "classnames";
import React, { useEffect, useState } from "react";
import { INFO_SLIDER } from "../../helpers";
import "./InfoSlider.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMenuStatus } from "../../store/actionsTypes";
import { setMenuStatus, setDeviceStatus } from "../../store/actionCreators";

type TransitionMS = 4 | 0;

interface Props {
  visible?: boolean;
}

export const InfoSlider: React.FC<Props> = ({ visible }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(600);
  const [left, setLeft] = useState(0);
  const [info, setInfo] = useState(INFO_SLIDER);
  const [transitionMS, setTransitionMs] = useState<TransitionMS>(4);
  const dispatch = useDispatch();
  const menuStatus = useSelector(getMenuStatus);

  const handleCarousel = (path: number) => {
    if (menuStatus) {
      dispatch(setMenuStatus(false));
    }

    const nextWidth = left + itemWidth * path;
    const pos = nextWidth / itemWidth;

    if (pos === info.length) {
      setInfo([...info, ...INFO_SLIDER]);
    }

    if (pos === -1) {
      const newLeft = itemWidth * info.length;
      setLeft(newLeft);
      setInfo([...INFO_SLIDER, ...info]);
      setTransitionMs(0);

      setTimeout(() => {
        setTransitionMs(4);
        setLeft(newLeft - itemWidth);
      }, 0);
      return;
    }

    setLeft(nextWidth);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (screenWidth < 1024) {
      dispatch(setDeviceStatus(true));
    } else {
      dispatch(setDeviceStatus(false));
    }
  }, [screenWidth, dispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 430) {
      setItemWidth(280);
    } else if (screenWidth < 600) {
      setItemWidth(330);
    } else if (screenWidth < 880) {
      setItemWidth(500);
    } else if (screenWidth < 1048) {
      setItemWidth(700);
    } else if (screenWidth < 880) {
      setItemWidth(500);
    }
  }, [screenWidth]);

  return (
    <div
      className={cn({
        Header__Slider: true,
        "Header__Slider--up": visible !== undefined && !visible,
      })}
    >
      <div className="InfoSlider__Wrap">
        <button
          type="button"
          className="InfoSlider__Button"
          onClick={() => handleCarousel(-1)}
        >
          <img
            src="/images/menu/subCategArrow.svg"
            alt="arrow left"
            className="InfoSlider__LeftArr InfoSlider__Arr"
          />
        </button>
        <div className="InfoSlider__Wrapper">
          <ul
            className="InfoSlider__List"
            style={{
              transform: `translateX(${-left}px)`,
              width: itemWidth,
              transition: `all 0.${transitionMS}s`,
            }}
          >
            {info.map((inf) => (
              <li
                key={inf + new Date().getTime() + Math.random()}
                className="InfoSlider__Current"
              >
                {inf}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="InfoSlider__Button"
          onClick={() => handleCarousel(1)}
        >
          <img
            src="/images/menu/subCategArrow.svg"
            alt="arrow left"
            className="InfoSlider__RightArr InfoSlider__Arr"
          />
        </button>
      </div>
    </div>
  );
};
