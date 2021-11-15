import * as React from 'react';
type PrefferedMode = "contrast" | "dark" | "light";

function useMediaQueryMatch(
  targetDocument: Document | undefined,
  query: string
): boolean {
  const targetWindow = targetDocument?.defaultView;

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [match] = React.useState<MediaQueryList | undefined>(() => {
    const matchMedia = targetWindow?.matchMedia;

    if (typeof matchMedia === "function") {
      return matchMedia(query);
    }

    return undefined;
  });

  // console.log(match);

  React.useEffect(
    function () {
      match?.addEventListener("change", forceUpdate);

      return () => {
        match?.removeEventListener("change", forceUpdate);
      };
    },
    [match]
  );

  return match?.matches || false;
}

export function usePrefferedMode(
  targetDocument: Document | undefined = document
): PrefferedMode {
  const isHighContrast = useMediaQueryMatch(
    targetDocument,
    "(forced-colors: active)"
  );
  const isDark = useMediaQueryMatch(
    targetDocument,
    "(prefers-color-scheme: dark)"
  );
  const matches: { mode: PrefferedMode; value: boolean }[] = [
    { mode: "contrast", value: isHighContrast },
    { mode: "dark", value: isDark },
    { mode: "light", value: true }
  ];

  // console.log("match", isHighContrast);

  return matches.find((entry) => entry.value)!.mode;
}