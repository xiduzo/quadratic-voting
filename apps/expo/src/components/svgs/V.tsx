import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export const V = (props: SvgProps) => (
  <Svg width={27} height={23} {...props}>
    <Path
      d="M8.19152 0C9.78119 0 11.0027 0.345625 11.8561 1.03801C12.7083 1.72926 13.3423 2.88324 13.7571 4.49654L17.525 18.8491C17.6398 18.9651 17.8125 19.0219 18.0432 19.0219C18.1818 19.0219 18.3079 18.9696 18.4238 18.8661C18.5386 18.7627 18.5965 18.6297 18.5965 18.4682C18.5965 18.284 18.55 18.0419 18.4579 17.7417L14.932 3.97696C14.8161 3.56199 14.6559 3.1129 14.4479 2.62857C14.2411 2.14424 14.0332 1.76451 13.8264 1.4871C13.6196 1.21083 13.4923 1.02664 13.4457 0.933416C13.3991 0.841325 13.3764 0.726495 13.3764 0.58779V0.345625C13.3764 0.115966 13.5264 0 13.8253 0H24.9905C25.4507 0 25.8029 0.109145 26.0449 0.328571C26.287 0.547998 26.4074 0.853831 26.4074 1.24493C26.4074 2.09763 25.7211 4.58295 24.3507 8.69862C22.9792 12.8143 21.4532 16.947 19.7703 21.0979C19.5158 21.7664 19.1533 22.2508 18.6818 22.5498C18.2091 22.8499 17.5932 23 16.8319 23H11.8197C11.0595 23 10.4425 22.8499 9.97096 22.5498C9.49826 22.2508 9.13578 21.7664 8.88239 21.0979L1.97033 2.87074C1.8317 2.50237 1.64194 2.19654 1.39991 1.95437C1.15788 1.71221 0.748816 1.41888 0.172716 1.07212C0.0579509 1.00277 0 0.899308 0 0.760603V0.345625C0 0.115966 0.138628 0 0.414746 0H8.19152Z"
      fill="#F6AE2D"
    />
  </Svg>
);
