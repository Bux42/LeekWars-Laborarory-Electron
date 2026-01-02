import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { hoverTooltipStyles as styles } from './HoverTooltip.styles';
import { IHoverTooltipProps } from './HoverTooltip.types';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

function HoverTooltip({ children, tooltip, delay = 300 }: IHoverTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [position, setPosition] = useState<TooltipPosition>('bottom');
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const spaceTop = containerRect.top;
    const spaceBottom = windowHeight - containerRect.bottom;
    const spaceLeft = containerRect.left;
    const spaceRight = windowWidth - containerRect.right;

    let bestPosition: TooltipPosition = 'bottom';

    if (spaceBottom >= tooltipRect.height + 10) {
      bestPosition = 'bottom';
    } else if (spaceTop >= tooltipRect.height + 10) {
      bestPosition = 'top';
    } else if (spaceRight >= tooltipRect.width + 10) {
      bestPosition = 'right';
    } else if (spaceLeft >= tooltipRect.width + 10) {
      bestPosition = 'left';
    }

    setPosition(bestPosition);

    let top = 0;
    let left = 0;

    switch (bestPosition) {
      case 'bottom':
        top = containerRect.bottom + 10;
        left = containerRect.left + containerRect.width / 2;
        break;
      case 'top':
        top = containerRect.top - tooltipRect.height - 10;
        left = containerRect.left + containerRect.width / 2;
        break;
      case 'right':
        top = containerRect.top + containerRect.height / 2;
        left = containerRect.right + 10;
        break;
      case 'left':
        top = containerRect.top + containerRect.height / 2;
        left = containerRect.left - tooltipRect.width - 10;
        break;
      default:
        top = containerRect.bottom + 10;
        left = containerRect.left + containerRect.width / 2;
    }

    setCoordinates({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
    return undefined;
  }, [isVisible]);

  const handleMouseEnter = () => {
    const id = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const getTransform = () => {
    if (position === 'top' || position === 'bottom') {
      return 'translateX(-50%)';
    }
    if (position === 'left' || position === 'right') {
      return 'translateY(-50%)';
    }
    return 'none';
  };

  const tooltipElement = isVisible
    ? createPortal(
        <div
          ref={tooltipRef}
          style={{
            ...styles.tooltip,
            position: 'fixed',
            top: `${coordinates.top}px`,
            left: `${coordinates.left}px`,
            transform: getTransform(),
            zIndex: 9999,
          }}
        >
          {tooltip}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        ref={containerRef}
        style={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {tooltipElement}
    </>
  );
}

export default HoverTooltip;
