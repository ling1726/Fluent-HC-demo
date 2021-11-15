import * as React from "react";
import {
  FluentProvider,
  Button,
  teamsLightTheme,
  teamsHighContrastTheme,
  makeStyles,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
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

  menuItem: {
    "@media (forced-colors: active)": {
      ":hover": {
        background: "Highlight",
        color: "Window",
        forcedColorAdjust: "none", // sometimes you need forced-color-adjust and use system colours
      },

      ":global([data-keyboard-nav]) :focus": {
        color: "highlight",
        ":after": {
          borderColor: "Highlight",
        },
      },
    },
  },
});

export const ConvergedDemo: React.FC<{ forced: boolean }> = ({ forced }) =>  {
  const styles = useStyles();
  const mode = usePrefferedMode();
  const theme = React.useMemo(() => {
    if (mode === "contrast") {
      return teamsHighContrastTheme;
    }

    return teamsLightTheme;
  }, [mode]);

  // These classes should only be applied in forced HC
  // until prefers-contrast: forced media query becomes a thing
  const menuItemClass = forced ? styles.menuItem : '';
  return (
    <FluentProvider theme={theme} style={{ padding: 48 }}>
      <Button>Native button</Button>
      <Button className={styles.primaryButton} appearance="primary">
        Native primary button
      </Button>
      <Menu>
        <MenuTrigger>
          <Button>Menu button</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem className={menuItemClass}>Item</MenuItem>
            <MenuItem className={menuItemClass}>Item</MenuItem>
            <MenuItem className={menuItemClass}>Item</MenuItem>
            <MenuItem className={menuItemClass}>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </FluentProvider>
  );
}
