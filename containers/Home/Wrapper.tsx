import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { currentPage } from "../../commons/commons";
import { rootPath, todoPath } from "../../commons/localPath";
import { Label } from "../../commons/text";

interface HomeType {
  children: JSX.Element;
}

const HomeWrapper: React.FC<HomeType> = ({ children }) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(newValue);
  };

  const getCurrentPage = () => {
    return currentPage([todoPath.overview], router.pathname, rootPath);
  };
  return (
    <>
      <Paper style={{ flexGrow: 1 }}>
        <Tabs
          value={getCurrentPage()}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label={Label.TO_DO_LIST} value={todoPath.overview} />
          <Tab label={Label.OTHER} value={rootPath} />
        </Tabs>
      </Paper>
      {children}
    </>
  );
};

export default HomeWrapper;
