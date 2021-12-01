import * as React from "react";
import {
  FluentProvider,
  Button,
  teamsLightTheme,
  teamsHighContrastTheme,
  makeStyles,
} from "@fluentui/react-components";
import { usePrefferedMode } from "./usePreferredMode";

const useStyles = makeStyles({
  primaryButton: {
    // `prefers-contrast: forced` will be a thing soon
    "@media (forced-colors: active)": {
      background: "WindowText",
      color: "Window",
      forcedColorAdjust: "none", // sometimes you need forced-color-adjust and use system colours
      ":hover": {
        background: "Highlight",
      },
    },
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    "& button": {
      background: "red",
    },
  },
});

export const ForcedColorAdjustDemo: React.FC<{ forced: boolean }> = ({
  forced,
}) => {
  const styles = useStyles();
  const mode = usePrefferedMode();
  const theme = React.useMemo(() => {
    if (mode === "contrast") {
      return teamsHighContrastTheme;
    }

    return teamsLightTheme;
  }, [mode]);

  return (
    <FluentProvider theme={theme} style={{ padding: 48 }}>
      <div>
        Here the primary button is styled using{" "}
        <strong>forced-color-adjust: none</strong>
        to implement the inverted background/foreground for primary buttons.
        However, once a user applies a color override in any way (even outside
        of forced colors), They will need to apply the override in forced colors
        mode everywhere.
      </div>
      <div className={styles.container}>
        <Button className={styles.primaryButton} appearance="primary">
          Primary button
        </Button>
      </div>
    </FluentProvider>
  );
};
