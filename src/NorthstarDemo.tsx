import * as React from "react";
import {
  Provider,
  Button,
  MenuButton,
  teamsTheme,
  teamsHighContrastTheme,
  systemColorsTheme,
} from "@fluentui/react-northstar";
import { usePrefferedMode } from "./usePreferredMode";

export const NorthstarDemo: React.FC<{ forced: boolean }> = ({ forced }) => {
  const mode = usePrefferedMode();
  const theme = React.useMemo(() => {
    if (mode === "contrast") {
      return forced ? systemColorsTheme : teamsHighContrastTheme;
    }

    return teamsTheme;
  }, [mode, forced]);

  return (
    <Provider theme={theme} style={{padding: 48}}>
        <Button content="Button" />
        <Button primary content="Primary button" />
        <MenuButton menu={['item', 'item', 'item']} trigger={<Button content="Menu button" />} />
    </Provider>
  );
};
