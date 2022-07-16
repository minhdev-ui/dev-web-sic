/* eslint-disable no-restricted-globals */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./partials/Logo";
import MessengerCustomerChat from "react-messenger-customer-chat";
import DropDown from "../elements/dropdown";
import { VscTriangleDown } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";
import avatar from "../../assets/images/admin/avatar.png";
import { FaBell, FaUserAlt } from "react-icons/fa";
import Store from "../../user/store";
import Image from "../elements/Image";

const propTypes = {
  Nav: PropTypes.array,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  scroll: PropTypes.bool,
};

const defaultProps = {
  Nav: null,
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
  scroll: false,
};

const Header = ({
  className,
  Nav,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  scroll,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);
  let history = useHistory();

  const nav = useRef(null);
  const hamburger = useRef(null);
  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  }, []);

  function openMenu() {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  }

  function closeMenu() {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  function keyPress(e) {
    isActive && e.keyCode === 27 && closeMenu();
  }

  function clickOutside(e) {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  }

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    scroll && "scroll",
    className
  );

  return (
    <header {...props} className={classes}>
      <div className=" container container-nav">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider ? "has-bottom-divider" : ""
          )}
        >
          <Logo />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames(
                  "header-nav",
                  isActive ? "is-active" : ""
                )}
              >
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition ? `header-nav-${navPosition}` : ""
                    )}
                  >
                    {Nav &&
                      Nav.map((navLink, index) => {
                        return (
                          <li
                            key={index}
                            className={navLink.dropdown ? "hover-dropdown" : ""}
                          >
                            {navLink.dropdown ? (
                              <>
                                <span>
                                  {navLink.name}{" "}
                                  <VscTriangleDown
                                    style={{ display: "inline-block" }}
                                    className="dropdown-icon"
                                  />
                                </span>
                                <DropDown children={navLink.dropdown} />
                              </>
                            ) : (
                              <NavLink
                                className={({ isActive }) =>
                                  isActive ? "active" : ""
                                }
                                to={navLink.href ? navLink.href : ""}
                                exact={true}
                              >
                                {navLink.name}
                              </NavLink>
                            )}
                          </li>
                        );
                      })}

                    {/* <div className="user-controller">
                      <div className="user-avatar">
                        <FaUserAlt />
                      </div>
                      <HiOutlineLogout
                        className="user-logout"
                        onClick={() => {
                          Store.setState({ status: false });
                          confirm("Bạn muốn đăng xuất?") &&
                            sessionStorage.setItem("LoginStatusUser", false);
                          setTimeout(() => {
                            history.push("/");
                          }, 500);
                        }}
                      />
                    </div> */}
                  </ul>
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
      <MessengerCustomerChat
        pageId="104115109644619"
        appId="3327191804169027"
      />
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
