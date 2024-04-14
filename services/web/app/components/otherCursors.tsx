import uniqolor from "uniqolor";
import { useCursor } from "~/lib/cursor";

export function OtherCursors({
  windowWidth,
  windowHeight,
}: {
  windowWidth: number;
  windowHeight: number;
}) {
  const { cursors } = useCursor();

  return (
    <div>
      {Object.entries(cursors).map(([id, { y, x }]) => {
        return (
          <Cursor
            key={id}
            x={x}
            y={y}
            id={id}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
          />
        );
      })}
    </div>
  );
}

function Cursor({
  x,
  y,
  id,
  windowHeight,
  windowWidth,
}: {
  x: number;
  y: number;
  id: string;
  windowWidth: number;
  windowHeight: number;
}) {
  const color = uniqolor(id, { lightness: [50] });
  const scaledX = x * windowWidth;
  const scaledY = y * windowHeight;

  return (
    <div
      style={{
        position: "absolute",
        left: scaledX,
        top: scaledY,
      }}
    >
      <svg
        height="32"
        viewBox="0 0 32 32"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd" transform="translate(10 7)">
          <path
            d="m6.148 18.473 1.863-1.003 1.615-.839-2.568-4.816h4.332l-11.379-11.408v16.015l3.316-3.221z"
            fill="#fff"
          />
          <path
            d="m6.431 17 1.765-.941-2.775-5.202h3.604l-8.025-8.043v11.188l2.53-2.442z"
            fill={color.color}
          />
        </g>
      </svg>
    </div>
  );
}
