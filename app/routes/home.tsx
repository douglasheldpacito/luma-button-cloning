import { twMerge } from "tailwind-merge";
import AnimatedButton, { themeColorsStyles } from "~/components/AnimatedButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black gap-10">
      <AnimatedButton theme="PINK">
        <CustomContent theme="PINK">Pink</CustomContent>
      </AnimatedButton>

      <AnimatedButton theme="ORANGE">
        <CustomContent theme="ORANGE">Orange</CustomContent>
      </AnimatedButton>

      <AnimatedButton theme="GREEN">
        <CustomContent theme="GREEN">Green</CustomContent>
      </AnimatedButton>

      <AnimatedButton theme="YELLOW">
        <CustomContent theme="YELLOW">Yellow</CustomContent>
      </AnimatedButton>
    </div>
  );
}

function CustomContent({
  theme = "PINK",
  children,
}: {
  theme?: keyof typeof themeColorsStyles;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={twMerge(
          "flex items-center justify-center bg-opacity-10 p-2 w-10 h-10 rounded-lg",
          themeColorsStyles[theme].background,
          themeColorsStyles[theme].text
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path
            fill="currentColor"
            d="M48 13.208v22.704c0 1.504-.828 1.332-1.533.783L36.5 29.25v-9.38l9.967-7.446c.87-.725 1.533-.556 1.533.784M27.553 12c3.768-.017 6.837 3.071 6.856 6.9v16.936a1.25 1.25 0 0 1-1.246 1.255H8.856c-3.768.017-6.837-3.071-6.856-6.9V13.255A1.25 1.25 0 0 1 3.246 12Z"
          ></path>
        </svg>
      </div>
      <div className="flex-1 text-white m-2">
        <div className="text-ellipsis text-left">{children}</div>
      </div>
      <div
        className={twMerge(
          "flex items-center justify-center w-[18px] h-[18px] rounded-full",
          themeColorsStyles[theme].text
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m4.198-9.784a1 1 0 1 0-1.396-1.432l-4.3 4.189-1.19-1.656a1 1 0 1 0-1.624 1.166l1.866 2.6a1 1 0 0 0 1.51.133z"
          ></path>
        </svg>
      </div>
    </>
  );
}
