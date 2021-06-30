export const currentPage = (
  allPath: Array<string>,
  pathname: string,
  fallback: string
) => {
  for (const path of allPath) {
    if (pathname.includes(path)) {
      return path;
    }
  }
  return fallback;
};

export const getFromSettings = (target: string) => {
  let settings: any = localStorage.getItem("settings");
  settings = settings ? JSON.parse(settings) : {};
  return settings[target];
};

export const setSettings = (newSetting: object) => {
  let localSettings: any = localStorage.getItem("settings");
  localSettings = localSettings ? JSON.parse(localSettings) : {};
  localSettings = { ...localSettings, ...newSetting };
  localStorage.setItem("settings", JSON.stringify(localSettings));
};
