import { IconProps } from "@/app/types/static-types";

export function StarIcon({w, h}: IconProps) {
    const height = h ? h : "24";
    const width = w ? w : "24";
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.29 4.14002L17.22 7.93C17.21 8.45 17.54 9.14002 17.96 9.45002L20.44 11.33C22.03 12.53 21.77 14 19.87 14.6L16.64 15.61C16.1 15.78 15.53 16.37 15.39 16.92L14.62 19.86C14.01 22.18 12.49 22.41 11.23 20.37L9.46999 17.52C9.14999 17 8.39 16.61 7.79 16.64L4.45003 16.81C2.06003 16.93 1.38002 15.55 2.94002 13.73L4.92 11.43C5.29 11 5.46 10.2 5.29 9.66001L4.28005 6.43C3.69005 4.53 4.75004 3.48002 6.64004 4.10002L9.59005 5.07002C10.09 5.23002 10.84 5.12001 11.26 4.81001L14.34 2.59001C16 1.39001 17.33 2.09002 17.29 4.14002Z"
        stroke="#FF951D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.4"
        d="M21.91 22L18.88 18.97"
        stroke="#FF951D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
