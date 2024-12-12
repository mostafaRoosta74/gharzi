import { useNavigate, useLocation, matchRoutes } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  styled,
  bottomNavigationActionClasses,
  Badge, Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useLocales from "../../hooks/useLocales";
import {ABSOLUTE_ROUTES} from "../../routes/paths";
import {UserTour} from "../../pages/Main/Home/components/TourComponet";


const CustomGrid = styled(Grid)({
  position: "fixed",
  bottom: 0,
  right: "0px",
  left: "0px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  paddingBottom: "calc(env(safe-area-inset-bottom) - 20px)",
  paddingLeft: "16px",
  paddingRight: "16px",
});

type NavigationItem = {
  title: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
  path: string;
  showBadge?: boolean;
  class:string
};

const blackList = [
  "ABSOLUTE_ROUTES.CHAT.VIEW",
].map((item) => ({
  path: item,
}));

const BottomNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useLocales();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const firstTime = !window.localStorage.getItem("intro")


  const navigationList = useMemo<NavigationItem[]>(
    () => [
      {
        title: translate("BOTTOM_NAVIGATE_HOME"),
        icon: <ViewListOutlinedIcon color="inherit" />,
        iconActive: <ViewListIcon color="inherit" />,
        path: ABSOLUTE_ROUTES.BASE,
        class:"post-list"
      },
      {
        title: "",
        icon: <></>,
        iconActive: <></>,
        path: ABSOLUTE_ROUTES.ADD_POST,
        class:""
      },
      {
        title: translate("BOTTOM_NAVIGATE_PROFILE"),
        icon: <AccountCircleOutlinedIcon color="inherit" />,
        iconActive: <AccountCircleIcon color="inherit" />,
        path: ABSOLUTE_ROUTES.PROFILE,
        showBadge: true,
        class:"profile"
      },
    ],
    [translate]
  );

  const isInBlackList = useMemo(
    () => !!matchRoutes(blackList, location),
    [location]
  );

  useEffect(() => {
    setValue(
      location.pathname === navigationList[0].path
        ? 0
        : navigationList.findIndex(
            (item, index) =>
              index !== 0 && location.pathname.includes(item.path)
          )
    );
  }, [location.pathname, navigationList]);

  return (
      <>
        {
          firstTime && <UserTour/>
        }

        <Fab color="primary" sx={{
          position:"fixed",
          bottom:"16px",
          left:"calc(50% - 28px)",
          zIndex:"1000"
        }}
             className={"add-post"}
        onClick={()=>{
          navigate(ABSOLUTE_ROUTES.ADD_POST);
        }}
        >
          <AddIcon
          />
        </Fab>
    <CustomGrid
      sx={(theme) => ({
        display: isInBlackList ? "none" : "unset",
        boxShadow: "0px 0px 8px 0px #0000003f",
      })}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          [`& .${bottomNavigationActionClasses.selected}`]: {
            color: `${theme.palette.common.black}!important`,
          },
          [`& .${bottomNavigationActionClasses.root}`]: {
            background: "#fff",
            minWidth: "0",
          },
        }}
      >
        {navigationList.map((item, index) => (
          <BottomNavigationAction
            key={item.path}
            label={item.title}
            className={item.class}
            icon={
              <Badge
                variant="dot"
                color="error"
                invisible={!item.showBadge}
              >
                {index !== value ? item.icon : item.iconActive}
              </Badge>
            }
            onClick={() => {
              if (value !== index) {
                navigate(item.path);
              }
            }}
          />
        ))}
      </BottomNavigation>

    </CustomGrid>
  </>
  );
};
export default BottomNavigate;
