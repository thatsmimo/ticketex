import { I18nManager } from "react-native";

import _Assets from "./Assets";
import _Colors from "./Colors";
import _IconDir from "./IconDir";
import Language_en from "./Language_en";
import _Language_ar from "./Language_ar";
import _Config from "./Config";
import _CommonStyles from "./CommonStyles";

export const Assets = _Assets;
export const Colors = _Colors;
export const IconDir = _IconDir;
export const Languages = !I18nManager.isRTL ? Language_en : _Language_ar;
export const Config = _Config;
export const CommonStyles = _CommonStyles;
