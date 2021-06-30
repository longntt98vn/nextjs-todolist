import { Tab, Tabs } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { currentPage } from "../../commons/commons";
import { todoPath } from "../../commons/localPath";
import { Label } from "../../commons/text";

const SiderBar: React.FC = () => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(newValue);
  };

  const getCurrentPage = () => {
    return currentPage([todoPath.create], router.pathname, todoPath.overview);
  };

  return (
    <Tabs
      orientation="vertical"
      value={getCurrentPage()}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      centered
    >
      <Tab label={Label.OVERVIEW} value={todoPath.overview} />
      <Tab label={Label.CREATE} value={todoPath.create} />
    </Tabs>
  );
};

export default SiderBar;
