import { mergeThemes, createTheme } from '@fluentui/styles';
import * as siteVariables from './siteVariables';
import * as componentVariables from './componentVariables';
import { teamsTheme } from '../teams';
export var systemColorsTheme = mergeThemes(teamsTheme, createTheme({
  siteVariables: siteVariables,
  componentVariables: componentVariables
}, 'system-colors'));
//# sourceMappingURL=index.js.map
