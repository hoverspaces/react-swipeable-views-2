
import './index.css';

import React, { useState } from "react";

export default function SwipeableScreens({
  className,
  style,
  children,
  currentSlide,
  onChange,
  drag_length = 80,
}) {
  const [touchStart, set_touchStart] = useState();
  const [slide_ended, set_slide_ended] = useState(); //for slide ended in one direction wiggle effect

  const swipingStyle = (cardNo, slide) => {
    const slideStyle = children.map((_, slide) => {
      return { transform: `translateX(${0 - slide * 100}%)` };
    });

    if (cardNo === slide) return slideStyle[slide];
    else return { ...slideStyle[slide], display: "hidden" };
  };

  const handle_sliding = (end_index) => {
    if (!touchStart) return;
    if (
      end_index - touchStart < -drag_length &&
      currentSlide < children.length - 1
    ) {
      onChange((currentSlide) => currentSlide + 1);
      set_touchStart();
    } else if (end_index - touchStart > drag_length && currentSlide > 0) {
      onChange((currentSlide) => currentSlide - 1);
      set_touchStart();
    }
  };

  return (
    <div style={style} className={"flex flex-row overflow-x-hidden items-start " + className}>
      {children.map((child, renderIndex) => (
        <div
          key={renderIndex}
          className={
            "flex flex-col min-w-full transition duration-300 border-white " +
            (touchStart ? "cursor-pointer cursor-grabbing " : "") +
            (slide_ended === "LEFT" ? "border-l-2 " : "") +
            (slide_ended === "RIGHT" ? "border-r-2 " : "")
          }
          style={swipingStyle(renderIndex, currentSlide)}
          //for touch screens
          onTouchStart={(touchStartEvent) => {
            set_touchStart(touchStartEvent.targetTouches[0].clientX);
          }}
          onTouchMove={(touchMoveEvent) => {
            if (!touchStart) return;
            if (
              touchStart - touchMoveEvent.targetTouches[0].clientX >
                drag_length ||
              touchStart - touchMoveEvent.targetTouches[0].clientX <
                -drag_length
            )
              handle_sliding(touchMoveEvent.targetTouches[0].clientX);
            //for slide ended in one direction wiggle effect
            if (
              touchStart < touchMoveEvent.targetTouches[0].clientX &&
              currentSlide <= 0
            )
              set_slide_ended("LEFT");
            if (
              touchStart > touchMoveEvent.targetTouches[0].clientX &&
              currentSlide >= children.length - 1
            )
              set_slide_ended("RIGHT");
          }}
          onTouchEnd={() => {
            set_slide_ended();
            set_touchStart();
          }}
          //for mouse
          onMouseDown={(mouseDownEvent) => {
            set_touchStart(mouseDownEvent.screenX);
          }}
          onMouseMove={(mouseUpEvent) => {
            if (!touchStart) return;
            if (
              touchStart - mouseUpEvent.screenX > drag_length ||
              touchStart - mouseUpEvent.screenX < -drag_length
            ) {
              handle_sliding(mouseUpEvent.screenX);
            }
            //for slide ended in one direction wiggle effect
            if (touchStart < mouseUpEvent.screenX && currentSlide <= 0)
              set_slide_ended("LEFT");
            if (
              touchStart > mouseUpEvent.screenX &&
              currentSlide >= children.length - 1
            )
              set_slide_ended("RIGHT");
          }}
          onMouseUp={() => {
            set_slide_ended();
            set_touchStart();
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

